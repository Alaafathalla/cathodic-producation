import React from "react";
import { m2ToFt2 } from "./utils";

export default class SurfaceAreaResults extends React.Component {
  renderLine(label, value, unit) {
    return (
      <div className="flex items-center justify-between py-1">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="font-semibold">{Number(value || 0).toFixed(4)} {unit}</span>
      </div>
    );
  }

  render() {
    const { structureType, results } = this.props;
    if (!results) return null;

    const card = (title, body) => (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <h3 className="text-sm font-semibold mb-3">{title}</h3>
        {body}
      </div>
    );

    if (structureType === 'pipeline') {
      const a_m2 = results.area_m2 || 0;
      return card('Pipeline Surface Area', (
        <div>
          {this.renderLine('A = π × D × L', '', '')}
          {this.renderLine('Area', a_m2, 'm²')}
          {this.renderLine('Area', m2ToFt2(a_m2), 'ft²')}
        </div>
      ));
    }

    if (structureType === 'tank-internal') {
      const Ashell = results.Ashell || 0;
      const Abottom = results.Abottom || 0;
      const Atotal = results.Atotal || 0;
      return card('Tank Internal Surface Area', (
        <div>
          {this.renderLine('Ashell = π × D × h', '', '')}
          {this.renderLine('Ashell', Ashell, 'm²')}
          {this.renderLine('Abottom = π × r²', '', '')}
          {this.renderLine('Abottom', Abottom, 'm²')}
          <div className="border-t my-2" />
          {this.renderLine('Atotal = Ashell + Abottom', '', '')}
          {this.renderLine('Atotal', Atotal, 'm²')}
          {this.renderLine('Atotal', m2ToFt2(Atotal), 'ft²')}
        </div>
      ));
    }

    if (structureType === 'tank-external-bottom') {
      const a_m2 = results.area_m2 || 0;
      return card('Tank External Bottom (Flat)', (
        <div>
          {this.renderLine('A = π × r²', '', '')}
          {this.renderLine('Area', a_m2, 'm²')}
          {this.renderLine('Area', m2ToFt2(a_m2), 'ft²')}
        </div>
      ));
    }

    return null;
  }
}
