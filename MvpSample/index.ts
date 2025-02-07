import { IInputs, IOutputs } from "./generated/ManifestTypes";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import Info from "./info";
import IMvpRecord from "./IMvpRecord";
import App from "./main";
// import App from "./main";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class MvpSample implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _context: ComponentFramework.Context<IInputs>;
    private _container: HTMLDivElement;
    private static _entityName = "bit_mpv";

    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._context = context;
        this._container = container;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public async updateView(
        context: ComponentFramework.Context<IInputs>
    ): Promise<void> {

        const result = await this.GetData(context);

        const root = ReactDOM.createRoot(this._container);

         if (result.length > 0) {
             root.render(
                 React.createElement(App, { elements: result }));
         }
         else {
            root.render(
                React.createElement(Info, { leyenda: "Emosido engañados" })
            );
         }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    private async GetData(
        context: ComponentFramework.Context<IInputs>
    ): Promise<Array<IMvpRecord>> {

        const dataset = context.parameters.CrmDataSet;

        const currentIds = dataset.sortedRecordIds;

        console.log(JSON.stringify(currentIds));

        const responseArray: Array<IMvpRecord> = [];

        for (let i = 0; i < currentIds.length; i++) {

            const mvpId = currentIds[i];

            if (mvpId != undefined) {
                const nombre = "Jorge Fernández";

                const texto = nombre.split(" ");

                const funcion = this._context.webAPI.retrieveMultipleRecords;
                const result = await funcion(
                    MvpSample._entityName,
                    "?$select=bit_emailaddress,bit_fullname,bit_nominations,bit_photourl,bit_mpvid&$expand=bit_RelPosition($select=name)&$filter=(bit_mpvid eq " + mvpId + ") and (bit_RelPosition/positionid ne null)&$top=1", 10);

                result.entities.forEach((entity) => {
                    responseArray?.push(<IMvpRecord>{
                        bit_emailaddress: entity.bit_emailaddress,
                        bit_fullname: entity.bit_fullname,
                        bit_nominations: entity.bit_nominations,
                        bit_position: entity.bit_RelPosition.name,
                        bit_photourl: entity.bit_photourl,
                        bit_mpvid: entity.bit_mpvid
                    });
                });
            }
        }

        return responseArray || [];
    }


}
