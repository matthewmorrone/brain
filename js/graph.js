// graph.js © 2015 James Abney http://github.com/jabney
(function(ex, undefined) {
'use strict';

var gr = ex.graph || (ex.graph = Object.create(null));

// ---------------------------------------------------------------
// The graph abstract data type.
// ---------------------------------------------------------------
gr.graph = function graph(numVerts) {
  var numEdges = 0, adj = [], i;

  // Initialize the adjacency array with an
  // empty array for each vertex.
  for (i = 0; i < numVerts; i++) adj.push([]);

  return {

  // Add an edge between to vertex indices.
  addEdge: function(s, t) {
    adj[s].push(t);
    adj[t].push(s);
    ++numEdges;
  },

  // Return the number of verts in the graph.
  numVerts: function() {
    return numVerts;
  },

  // Return the number of edges in the graph.
  numEdges: function() {
    return numEdges;
  },

  // Iterate through vertices adjecent to 'vert'.
  adj: function(vert, action, context) {
    adj[vert].forEach(function(v) {
      action.call(context, v);
    });
  },

  // Iterate through all edges in the graph.
  each: function(action, context) {
    adj.forEach(function(a, s) {
      this.adj(s, function(t) {
        action.call(context, s, t);
      });
    }, this);
  }};
};

// ---------------------------------------------------------------
// Depth-first search - an abstract dfs that issues a callback for
// every pair of vertices in an edge (s, t) as it's encountered. 
// ---------------------------------------------------------------
gr.dfs = function dfs(graph, source, action, context) {
  var visited = new Array(graph.numVerts());

  // Initiate a depth-first search.
  (function search(s) {
    visited[s] = true;
    graph.adj(s, function(t) {
      if (!visited[t])
        action.call(context, s, t),
        search(t);
    });
  })(source);

  return {

  // Return true if the target is connected to the source.
  find: function(t) {
    return visited[t] || false;
  }};
};

// ---------------------------------------------------------------
// Breadth-first search
// ---------------------------------------------------------------
gr.bfs = function bfs(graph, source, action, context) {
  var visited = new Array(graph.numVerts()),
  queue = [source], s;

  // Perform breadth-first search.
  visited[source] = true;
  while (queue.length) {
    s = queue.shift();
    graph.adj(s, function(t) {
      if (!visited[t])
        queue.push(t),
        visited[t] = true,
        action.call(context, s, t);
    });
  }

  return {

  // Return true if the target is connected to the source.
  find: function(t) {
    return visited[t] || false;
  }};
};

// ---------------------------------------------------------------
// Paths - uses bfs to find the shortest path from the source
// vertex to a target vertex if the path exists.
// ---------------------------------------------------------------
gr.paths = function paths(graph, source) {
  var pathTo = new Array(graph.numVerts()),
  dist = new Array(graph.numVerts()), bfs;

  // The distance to the source vertex is zero.
  dist[source] = 0;

  // Conduct a depth-first search to build path data.
  bfs = gr.bfs(graph, source, function(s, t) {
    dist[t] = dist[s] + 1;
    pathTo[t] = s;
  });

  return {

  // Return the distance to the target
  // vertex from the source vertex.
  dist: function(t) {
    return dist[t];
  },

  // Return an array representing the path from
  // source to target, or null if no path exists.
  to: function(target) {
    var path = [target], v = target;
    if (pathTo[target] !== undefined) {
      while ((v = pathTo[v]) !== undefined)
        path.push(v);
    }
    return path.length > 1 && path.reverse() || null;
  },

  // Return true if the source is connected to the target.
  reaches: function(target) {
    return bfs.find(target);
  }};
};

// ---------------------------------------------------------------
// Connected components
// ---------------------------------------------------------------
gr.components = function components(graph) {
  var verts = graph.numVerts(),
  cId = new Array(verts),
  count = 0, i;

  // Process graph with dfs to determine connected components.
  for (i = 0; i < verts; i++) {
    if (cId[i] === undefined) {
      cId[i] = count;
      gr.dfs(graph, i, function(s, t) {
        cId[t] = count;
      });
      count++;
    }
  }

  return {

  // Return true if two vertices are connected, false otherwise.   
  connected: function(v, w) {
    return cId[v] === cId[w];
  },

  // Return the number of components in the graph.
  count: function() {
    return count;
  },

  // Return the component id of a given vertex.
  id: function(v) {
    return cId[v];
  }};
};

})(typeof exports !== 'undefined' && exports || this);