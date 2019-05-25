import {EndpointRepresentation} from "./endpoints";
import {ComputedAnchorPosition, Orientation} from "../factory/anchor-factory";
import {PaintStyle} from "../styles";
import {jsPlumbInstance} from "../core";
import {EndpointFactory} from "../factory/endpoint-factory";

export type ComputedDotEndpoint = [ number, number, number, number, number ];

export class DotEndpoint<E> extends EndpointRepresentation<E, ComputedDotEndpoint> {

    radius:number;
    defaultOffset:number;
    defaultInnerRadius:number;

    constructor(instance:jsPlumbInstance<E>, params?:any) {
        
        super(instance);
        
        params = params || {};
        this.radius = params.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;
    }

    _compute(anchorPoint:ComputedAnchorPosition, orientation:Orientation, endpointStyle:any):ComputedDotEndpoint {
        //this.radius = endpointStyle.radius || this.radius;
        let x = anchorPoint[0] - this.radius,
            y = anchorPoint[1] - this.radius,
            w = this.radius * 2,
            h = this.radius * 2;

        if (endpointStyle.stroke) {
            let lw = endpointStyle.strokeWidth || 1;
            x -= lw;
            y -= lw;
            w += (lw * 2);
            h += (lw * 2);
        }

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        return [ x, y, w, h, this.radius ];
    }


    getType(): string {
        return "Dot";
    }
}

EndpointFactory.register("Dot", DotEndpoint);