import React from "react";
import { STRUCTURE_TYPES, LENGTH_UNITS } from "./utils";

export default class SurfaceAreaForm extends React.Component {
  render() {
    const {
      structureType,
      onChangeType,
      inputs,
      units,
      onChangeInput,
      onChangeUnit,
      onSubmit,
      submitting,
    } = this.props;

    const inputCls =
      "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white";

    const Label = ({ children }) => (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{children}</label>
    );

    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-semibold mb-3">Structure Type</h3>
          <Label>Select Structure Type</Label>
          <select
            value={structureType}
            onChange={(e) => onChangeType(e.target.value)}
            className={inputCls}
          >
            {STRUCTURE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Parameters */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-semibold mb-3">Input Parameters</h3>

          {(structureType === 'pipeline' || structureType === 'tank-internal' || structureType === 'tank-external-bottom') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Diameter</Label>
                <input
                  type="number"
                  step="any"
                  value={inputs.diameter || ''}
                  onChange={(e) => onChangeInput('diameter', e.target.value)}
                  className={inputCls}
                  placeholder="e.g., 1.2"
                  required
                />
              </div>
              <div>
                <Label>Diameter Unit</Label>
                <select
                  value={units.diameter || 'm'}
                  onChange={(e) => onChangeUnit('diameter', e.target.value)}
                  className={inputCls}
                >
                  {LENGTH_UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {structureType === 'pipeline' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label>Length</Label>
                <input
                  type="number"
                  step="any"
                  value={inputs.length || ''}
                  onChange={(e) => onChangeInput('length', e.target.value)}
                  className={inputCls}
                  placeholder="e.g., 100"
                  required
                />
              </div>
              <div>
                <Label>Length Unit</Label>
                <select
                  value={units.length || 'm'}
                  onChange={(e) => onChangeUnit('length', e.target.value)}
                  className={inputCls}
                >
                  {LENGTH_UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {structureType === 'tank-internal' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label>Wetted Height</Label>
                <input
                  type="number"
                  step="any"
                  value={inputs.height || ''}
                  onChange={(e) => onChangeInput('height', e.target.value)}
                  className={inputCls}
                  placeholder="e.g., 8"
                  required
                />
              </div>
              <div>
                <Label>Height Unit</Label>
                <select
                  value={units.height || 'm'}
                  onChange={(e) => onChangeUnit('height', e.target.value)}
                  className={inputCls}
                >
                  {LENGTH_UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            disabled={submitting}
          >
            {submitting ? 'Calculating...' : 'Calculate Surface Area'}
          </button>
        </div>
      </form>
    );
  }
}
