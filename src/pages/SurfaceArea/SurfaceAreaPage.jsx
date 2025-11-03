import React from "react";
import SurfaceAreaForm from "./SurfaceAreaForm";
import SurfaceAreaResults from "./SurfaceAreaResults";
import {
  STRUCTURE_TYPES,
  toMeters,
  pipelineSurfaceArea,
  internalTankSurfaceArea,
  externalTankBottomAreaFlat,
} from "./utils";
import CalculatorPanel from "../../components/ui/CalculatorPanel";

export default class SurfaceAreaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      structureType: STRUCTURE_TYPES[0].value,
      inputs: { diameter: "", length: "", height: "" },
      units: { diameter: "m", length: "m", height: "m" },
      submitting: false,
      results: null,
    };
  }

  onChangeType = (structureType) => {
    this.setState({ structureType, results: null });
  };

  onChangeInput = (k, v) => {
    this.setState({ inputs: { ...this.state.inputs, [k]: v } });
  };

  onChangeUnit = (k, v) => {
    this.setState({ units: { ...this.state.units, [k]: v } });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitting: true }, () => {
      try {
        const { structureType, inputs, units } = this.state;
        const diameter_m = toMeters(inputs.diameter, units.diameter);

        if (structureType === 'pipeline') {
          const length_m = toMeters(inputs.length, units.length);
          const area_m2 = pipelineSurfaceArea({ diameter_m, length_m });
          this.setState({ results: { area_m2 } });
        }

        if (structureType === 'tank-internal') {
          const height_m = toMeters(inputs.height, units.height);
          const r = internalTankSurfaceArea({ diameter_m, height_m });
          this.setState({ results: r });
        }

        if (structureType === 'tank-external-bottom') {
          const area_m2 = externalTankBottomAreaFlat({ diameter_m });
          this.setState({ results: { area_m2 } });
        }
      } finally {
        this.setState({ submitting: false });
      }
    });
  };

  renderInfoCard() {
    const { structureType } = this.state;
    const baseClass = "rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800";

    if (structureType === 'pipeline') {
      return (
        <div className={baseClass}>
          <h3 className="text-sm font-semibold mb-2">Pipeline Area</h3>
          <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300">
{`A = π × D × L`}
          </pre>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Converts inputs to SI (meters) and returns area in m².</p>
        </div>
      );
    }

    if (structureType === 'tank-internal') {
      return (
        <div className={baseClass}>
          <h3 className="text-sm font-semibold mb-2">Tank Internal Area</h3>
          <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300">
{`Ashell = π × D × h
Abottom = π × r² (r = D/2)
Atotal = Ashell + Abottom`}
          </pre>
        </div>
      );
    }

    return (
      <div className={baseClass}>
        <h3 className="text-sm font-semibold mb-2">Tank External Bottom (Flat)</h3>
        <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300">
{`A = π × r² (r = D/2)`}
        </pre>
      </div>
    );
  }

  render() {
    const { structureType, inputs, units, submitting, results } = this.state;

    return (
      <CalculatorPanel
        title="Surface Area Calculator"
        subtitle="Convert inputs to SI units automatically. Results in m² and ft²."
        left={(
          <SurfaceAreaForm
            structureType={structureType}
            onChangeType={this.onChangeType}
            inputs={inputs}
            units={units}
            onChangeInput={this.onChangeInput}
            onChangeUnit={this.onChangeUnit}
            onSubmit={this.onSubmit}
            submitting={submitting}
          />
        )}
        right={(
          <>
            {this.renderInfoCard()}
            <SurfaceAreaResults structureType={structureType} results={results} />
          </>
        )}
      />
    );
  }
}
