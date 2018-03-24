setUpFigure("#figure1", {
    figureSize: {x: 2, y: 2},
    gridString: "00 00",
    hullString: "0,0 2,0 2,2 0,2 0,0",
    image: 'selected/51.604684999999996_27.162096999999996_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0.60, y: 0.70}
});

setUpFigure("#figure2", {
    figureSize: {x: 3, y: 2},
    gridString: "000 101",
    hullString: "0,0 3,0 3,1 2,1 2,2 1,2 1,1 0,1 0,0",
    image: 'selected/51.325369_26.900646999999996_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0.41, y: 0.47}
});

setUpFigure("#figure3", {
    figureSize: {x: 2, y: 3},
    gridString: "01 01 00",
    hullString: "0,0 1,0 1,2 2,2 2,3 0,3 0,0",
    image: 'selected/51.564878_26.512397999999997_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.53, y: 0.47}
});

setUpFigure("#figure4", {
    figureSize: {x: 1, y: 3},
    gridString: "0 0 0",
    hullString: "0,0 1,0 1,3 0,3 0,0",
    image: 'selected/51.496603_26.354936_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure5", {
    figureSize: {x: 2, y: 3},
    gridString: "01 00 01",
    hullString: "0,0 1,0 1,1 2,1 2,2 1,2 1,3 0,3 0,0",
    image: 'selected/51.582387_27.104335_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure6", {
    figureSize: {x: 1, y: 1},
    gridString: "0",
    hullString: "0,0 1,0 1,1 0,1 0,0",
    image: 'selected/51.639019_27.130822_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure7", {
    figureSize: {x: 3, y: 1},
    gridString: "000",
    hullString: "0,0 3,0 3,1 0,1 0,0",
    image: 'selected/51.5682122_26.512397999999997_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure8", {
    figureSize: {x: 2, y: 3},
    gridString: "10 00 10",
    hullString: "2,0 2,3 1,3 1,2 0,2 0,1 1,1, 1,0 2,0",
    image: 'selected/51.588868_27.153431_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure9", {
    figureSize: {x: 2, y: 2},
    gridString: "10 00",
    hullString: "2,0 2,2 0,2 0,1 1,1 1,0 2,0",
    image: 'selected/51.573971199999995_27.129568000000003_05_Oct_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure10", {
    figureSize: {x: 3, y: 2},
    gridString: "011 000",
    hullString: "0,0 1,0 1,1 3,1 3,2 0,2 0,0",
    image: 'selected/51.3361602_26.558144000000002_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

setUpFigure("#figure11", {
    figureSize: {x: 2, y: 2},
    gridString: "10 00",
    hullString: "2,0 2,2 0,2 0,1 1,1 1,0 2,0",
    image: 'selected/51.580773199999996_26.500263_09_Mar_2015_GMT.jpg',
    imageOffsetPc: {x: 0.3, y: 0.4}
});

d3.select("#finalmap").call(finalmap());



function setUpFigure(selector, options) {
    var res = {};

    res.figure = figure()
            .figureSize(options.figureSize)
            .gridString(options.gridString)
            .image(options.image)
            .imageOffsetPc(options.imageOffsetPc);

    d3.select(selector).call(res.figure);

    res.map = map()
            .hullString(options.hullString)
            .image(options.image)
            .imageOffsetPc(options.imageOffsetPc)
            .backgroundSize_pc(res.figure.getBackgroundSize_pc());

    d3.select(selector).call(res.map);

    res.figure.onClick(res.map.showMap);

    return res;
}


