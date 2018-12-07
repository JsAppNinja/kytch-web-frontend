/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import CollapsibleDropDown from './components/collapsible_dropdown';

const countriesList = {
  'Asia': [
    'China',
    'Russia',
  ],
  'Europe': [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Croatia',
  ],
  'Middle East': [
    'UAE',
    'Saudi Arabia',
  ],
  'North America': [
    'Canada',
    'USA',
    'Mexico'
  ]
}
export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <br/>
          <br/>
          <h2 className="heading text-center">Where is your kitchen?</h2>
          <br/>
          <ul className="ul-countries-available">
            {
              Object.keys(countriesList).map((continent, index) => <CollapsibleDropDown key={index} title={continent} list={countriesList[continent]} />)
            }
            {/* <CollapsibleDropDown title="Asia" list={['China', 'Russia']}></CollapsibleDropDown>
            <li className="collapsible-dropdown">
              <a className="" data-toggle="collapse" href="#collapseAsiaPacific" role="button" aria-controls="collapseAsiaPacific">Asia Pacific</a>
              <ul className="collapse ul-collapsible-dropdown" id="collapseAsiaPacific">
                <li><a href="#">Austria</a></li>
                <li><a href="#">Belgium</a></li>
                <li><a href="#">Bulgaria</a></li>
                <li><a href="#">Croatia</a></li>
                <li><a href="#">Czech Republic</a></li>
                <li><a href="#">Denmark</a></li>
                <li><a href="#">Estonia</a></li>
                <li><a href="#">Finland</a></li>
                <li><a href="#">Germany</a></li>
                <li><a href="#">Hungary</a></li>
                <li><a href="#">Ireland</a></li>
                <li><a href="#">Latvia</a></li>
                <li><a href="#">Luxembourg</a></li>
              </ul>
            </li>
            <li className="collapsible-dropdown">
              <a className="" data-toggle="collapse" href="#collapseEurope" role="button" aria-controls="collapseEurope">Europe</a>
              <ul className="collapse ul-collapsible-dropdown" id="collapseEurope">
                <li><a href="#">China</a></li>
                <li><a href="#">Russia</a></li>
              </ul>
            </li>
            <li className="collapsible-dropdown">
              <a className="" data-toggle="collapse" href="#collapseMiddleEast" role="button" aria-controls="collapseMiddleEast">Middle East</a>
              <ul className="collapse ul-collapsible-dropdown" id="collapseMiddleEast">
                <li><a href="#">Saudi Arabia</a></li>
                <li><a href="#">UAE</a></li>
              </ul>
            </li>
            <li className="collapsible-dropdown">
              <a className="" data-toggle="collapse" href="#collapseNorthAmerica" role="button" aria-controls="collapseNorthAmerica">North America</a>
              <ul className="collapse ul-collapsible-dropdown" id="collapseNorthAmerica">
                <li><a href="#">Canada</a></li>
                <li><a href="#">Mexico</a></li>
                <li><a href="#">USA</a></li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  </main>
);
