let data, scatterplot, barchart;
let difficultyFilter = [];
let colorScale;
const dispatcher = d3.dispatch('filterDifficulty', 'filterCategories');

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data.map(d => ({
       ...d,
       distance: +d.distance,
       time: +d.time
     }));

     colorScale = d3.scaleOrdinal()
        .domain(['Easy', 'Intermediate', 'Difficult'])
        .range(['#66c2a5', '#fc8d62', '#8da0cb']); // good colors

     scatterplot = new Scatterplot({
       parentElement: '#scatterplot',
       colorScale: colorScale
     }, data);
     scatterplot.updateVis();

     barchart = new Barchart({
       parentElement: '#barchart',
       colorScale: colorScale,
       dispatcher: dispatcher 
     }, data);
     barchart.updateVis();
   })
  .catch(error => console.error(error));

//Listen for filtering event
dispatcher.on('filterDifficulty', (selectedDifficulties) => {
  if (selectedDifficulties.length === 0) {
    scatterplot.data = data;
  } else {
    scatterplot.data = data.filter(d => selectedDifficulties.includes(d.difficulty));
  }
  scatterplot.updateVis();
});

dispatcher.on('filterCategories', (selectedCategories) => {
  if (selectedCategories.length === 0) {
    scatterplot.data = data;
  } else {
    scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
  }
  scatterplot.updateVis();
});