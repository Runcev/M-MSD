class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const pointsCreation = (input: string) => {
    const coordinates: number[] = input.match(/-?\d+/g)!.map(Number);

    let points: Point[] = [];

    for (let i = 0; i < coordinates.length; i += 2) {
        points.push(new Point(Number(coordinates[i]), Number(coordinates[i + 1])));
    }
    return points;
}

// https://www.geeksforgeeks.org/check-if-given-polygon-is-a-convex-polygon-or-not/
const CrossProduct = (points: Point[]) => {
    // Stores coefficient of X
    // direction of vector A[1]A[0]
    let X1 = (points[1].x - points[0].x);

    // Stores coefficient of Y
    // direction of vector points[1]points[0]
    let Y1 = (points[1].y - points[0].y);

    // Stores coefficient of X
    // direction of vector points[2]points[0]
    let X2 = (points[2].x - points[0].x);

    // Stores coefficient of Y
    // direction of vector points[2]points[0]
    let Y2 = (points[2].y - points[0].y);

    // Return cross product
    return (X1 * Y2 - Y1 * X2);
}

// Function to check if the polygon is
// convex polygon or not
const isConvex = (points: Point[]) => {
    // Stores count of
    // edges in polygon
    let N = points.length;

    // Stores direction of cross product
    // of previous traversed edges
    let prev = 0;

    // Stores direction of cross product
    // of current traversed edges
    let curr = 0;

    // Traverse the array
    for (let i = 0; i < N; i++) {

        // Stores three adjacent edges
        // of the polygon
        let temp= [points[i],
            points[(i + 1) % N],
            points[(i + 2) % N]];

        // Update curr
        curr = CrossProduct(temp);

        // If curr is not equal to 0
        if (curr != 0) {

            // If direction of cross product of
            // all adjacent edges are not same
            if (curr * prev < 0) {
                return false;
            }
            else {
                // Update curr
                prev = curr;
            }
        }
    }
    return true;
}


const isIntersected = (a: Point, b: Point, c: Point, d: Point) => {
    if((a === c) || (a === d) || (b === c) || (b === d)){
        console.log("Points have common point");
        return false
    }
    let det: number = (b.x - a.x) * (d.y - c.y) - (d.x - c.x) * (b.y - a.x);

    if (det === 0) {
        return false;
    } else {
        let lambda: number = ((d.y - c.y) * (d.x - a.x) + (c.x - d.x) * (d.y - a.y)) / det;
        let gamma: number = ((a.x - b.y) * (d.x - a.x) + (b.x - a.x) * (d.y - a.y)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

export { Point, pointsCreation, isIntersected, isConvex};

