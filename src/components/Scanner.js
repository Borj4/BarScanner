import React, { Component } from 'react';
import { useState, useEffect } from 'react';

//Tienes que ver qué se hace con _onDetected

import Quagga from 'quagga';

const Scanner = () => { 
// export default class Scanner extends Component {
//     constructor(props) {
//         super(props);
//         this._onDetected = this._onDetected.bind(this);
//     }

    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        width: 640,
                        height: 480,
                        facingMode: 'environment', // or user
                    },
                },
                locator: {
                    patchSize: 'medium',
                    halfSample: true,
                },
                numOfWorkers: 0,
                decoder: {
                    readers: ['ean_reader'],
                },
                locate: false,
            },
            function(err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(this._onDetected);
        return () => Quagga.offDetected(this._onDetected)
    }, [])
    // componentDidMount() {
        // Quagga.init(
        //     {
        //         inputStream: {
        //             type: 'LiveStream',
        //             constraints: {
        //                 width: 640,
        //                 height: 480,
        //                 facingMode: 'environment', // or user
        //             },
        //         },
        //         locator: {
        //             patchSize: 'medium',
        //             halfSample: true,
        //         },
        //         numOfWorkers: 0,
        //         decoder: {
        //             readers: ['ean_reader'],
        //         },
        //         locate: false,
        //     },
        //     function(err) {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         Quagga.start();
        //     }
        // );
        // Quagga.onDetected(this._onDetected);
    // }

    // componentWillUnmount() {
    //     Quagga.offDetected(this._onDetected);
    // }

    Quagga._onDetected((result) => {
        this.props.onDetected(result);
    })


    return  <div id="interactive" className="viewport" />;   
}
export default Scanner;