function tsp_hk(distance_matrix) {
  if (distance_matrix.length <= 1) {
    return 0;
  }

  // cache is reset every time the function is called 
  let cache = [];

  // cities not yet visited
  let cities = Object.keys(distance_matrix);

  let temp = 0;
  let min  = Infinity;

  // loops through the matrix to find the shortest path, compares
  // to previous shortest path to get the best one
  for (i = 0; i < cities.length; i++) {
    temp = heldKarp(distance_matrix, i, cities, cache);
    if (temp < min) {
      min = temp;
    }
  }

  return min;
}


function heldKarp(dm, start, cities, cache) {
  let key = JSON.stringify(cities) + start  
  // check if already in the cache
  if (cache[key] != undefined) {
    return cache[key];
  }

  if (cities.length == 2) {
    // length of tour that starts at start, goes directly to other city in cities
    cache[key] = dm[cities[0]][cities[1]];
    return cache[key];
  }
  else {
    let minimum = Infinity;

    for (let city = 0; city < cities.length; city++) {
      // for each city in cities, unless the city is start
      if(cities[city] != start) {
        // reduce the set of cities that are unvisited by one (the old start)
        let newCities = cities.filter(city => city != start);
        // add on the distance from old start to new start
        let newMin = heldKarp(dm, cities[city], newCities, cache) + dm[start][cities[city]];

        // check if shorter
        if (newMin < minimum) {
          minimum = newMin;
        }
      }
    }

    cache[key] = minimum;
    return minimum;
  }
}

