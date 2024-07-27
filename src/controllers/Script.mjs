import Graph from "../models/Graph.mjs"; 

document.addEventListener('DOMContentLoaded', function() {
    const grafo = new Graph(); 
    
    const formAgregarVertice = document.getElementById('addVertexForm');
    formAgregarVertice.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const inputNombreVertice = document.getElementById('vertexName');
        const nombreVertice = inputNombreVertice.value.trim();

        if (nombreVertice !== '') {
            grafo.addVertex(nombreVertice);
            console.log(`Vértice agregado: ${nombreVertice}`);
            inputNombreVertice.value = ''; 
        } else {
            console.log('Ingrese un nombre válido para el vértice.');
        }
    });

    const formAgregarArista = document.getElementById('addEdgeForm');
    formAgregarArista.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputVerticeInicial = document.getElementById('startVertex');
        const inputVerticeFinal = document.getElementById('endVertex');
        const inputPeso = document.getElementById('weight');

        const verticeInicial = inputVerticeInicial.value.trim();
        const verticeFinal = inputVerticeFinal.value.trim();
        const peso = parseInt(inputPeso.value);

        if (verticeInicial !== '' && verticeFinal !== '' && !isNaN(peso)) {
            const agregado = grafo.addEdge(verticeInicial, verticeFinal, peso);
            if (agregado) {
                console.log(`Arista agregada de ${verticeInicial} a ${verticeFinal} con peso ${peso}`);
                inputVerticeInicial.value = '';
                inputVerticeFinal.value = '';
                inputPeso.value = '';
            } else {
                console.log('No se pudo agregar la arista.');
            }
        } else {
            console.log('Ingrese valores válidos para los vértices y el peso.');
        }
    });

    const botonDFS = document.getElementById('dfsBtn');
    botonDFS.addEventListener('click', function() {
        const contenedorResultados = document.getElementById('resultContainer');
        contenedorResultados.innerHTML = ''; 
        grafo.dfs(grafo.getVertices().next().value, (vertice) => { // Asume que el primer vértice es el punto de partida
            console.log(`Visitando el vértice: ${vertice}`);
            contenedorResultados.innerHTML += `${vertice} `;
        });
    });

    // Agregar funcionalidad de Dijkstra
    const formDijkstra = document.getElementById('dijkstraForm');
    formDijkstra.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputVerticeInicio = document.getElementById('startDijkstraVertex');
        const inputVerticeDestino = document.getElementById('endDijkstraVertex');
        const verticeInicio = inputVerticeInicio.value.trim();
        const verticeDestino = inputVerticeDestino.value.trim();

        if (verticeInicio !== '' && verticeDestino !== '') {
            const distance = grafo.dijkstra(verticeInicio, verticeDestino);
            
            const contenedorResultados = document.getElementById('dijkstraResultContainer');
            contenedorResultados.innerHTML = ''; 

            if (distance < 1000000) { // Inf is set as 1000000
                contenedorResultados.innerHTML = `
                    <h2>Resultado de Dijkstra</h2>
                    <p>Distancia total desde ${verticeInicio} a ${verticeDestino}: ${distance} km</p>
                `;
            } else {
                contenedorResultados.innerHTML = `
                    <h2>Resultado de Dijkstra</h2>
                    <p>No se encontró un camino desde ${verticeInicio} a ${verticeDestino}.</p>
                `;
            }

            console.log(`Distancia desde el vértice ${verticeInicio} al vértice ${verticeDestino}: ${distance}`);
        } else {
            console.log('Ingrese vértices de inicio y destino válidos para Dijkstra.');
        }
    });

});
