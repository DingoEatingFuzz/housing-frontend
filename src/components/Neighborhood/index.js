import React, { PropTypes } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import { crossHatch } from '../CrossHatch';
import { HOUSING_TEAM_PRIMARY_COLOR } from '../../utils/data-constants';

const NEIGHBORHOOD_OPACITY = 0.8;
const NOT_AFFORDABLE_COLOR = '#9A9D9F'; // color chosen from the style guide, was contrasted with our primary in a pie chart
const AFFORDABLE_COLOR = HOUSING_TEAM_PRIMARY_COLOR;

/**
 * These functions are where we can style the geoJson based on data.
 * We have available the properties described here: http://leafletjs.com/reference.html#path-options
 */
const setOtherPathOptions = ({ affordableOther }) => ({
  fillOpacity: affordableOther ? 1 : 0,
  opacity: 0,
  fillPattern: crossHatch,
});

const setYouPathOptions = ({ affordableYou }) => ({
  opacity: NEIGHBORHOOD_OPACITY,
  weight: 1,
  fillOpacity: NEIGHBORHOOD_OPACITY,
  fillColor: affordableYou ? AFFORDABLE_COLOR : NOT_AFFORDABLE_COLOR,
  color: affordableYou ? AFFORDABLE_COLOR : NOT_AFFORDABLE_COLOR,
});

/**
 * Neighborhood component now renders two geojson layers superimposed on one another
 * CrossHatch 'affordableOther' representation is rendered second, therefore it has precedence
 * and will receive mouse events. Click event is propagated up
 */
const Neighborhood = ({ data, onSelect }) => (
  <LayerGroup>
    <GeoJSON data={data} {...setYouPathOptions(data)} />
    <GeoJSON data={data} {...setOtherPathOptions(data)} onClick={e => onSelect(e.layer.feature)} />
  </LayerGroup>
);

Neighborhood.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
};

Neighborhood.defaultProps = {
  onSelect() {},
};

export default Neighborhood;
