export interface IArrowTriadPathData {
  readonly path: string;
  readonly stemPath: string;
  readonly outerHeadPoints: string;
  readonly innerHeadPoints: string;
  readonly neckLine: string;
}

export interface IArrowTriadGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly blueArrow: IArrowTriadPathData;
  readonly yellowArrow: IArrowTriadPathData;
  readonly greenArrow: IArrowTriadPathData;
  readonly dashedArcs: readonly string[];
}

/**
 * Precision coordinates and SVG paths for the 3-way curved arrow triad diagram.
 * Directly extracted from the design template (560 x 662):
 * - Equilateral/isosceles triangle arrowheads with symmetrical barb overhangs.
 * - Inset framed inner triangle facets with darker depth stroke.
 * - Clean curved stems meeting at 120-degree central pie junction.
 * - Concentric dashed guide lines centered in each gap.
 */
export function createArrowTriadGeometry(): IArrowTriadGeometry {
  return {
    viewBoxWidth: 560,
    viewBoxHeight: 662,
    yellowArrow: {
      path: 'M 526 31 L 429 89 L 437 92 C 431 188, 383 244, 324 281 L 352 329 L 408 329 C 410 260, 435 190, 515 137 L 528 144 Z',
      stemPath:
        'M 352 329 L 408 329 C 410 260, 435 190, 515 137 L 437 92 C 431 188, 383 244, 324 281 Z',
      outerHeadPoints: '429,89 526,31 528,144',
      innerHeadPoints: '447,89 517,47 518,128',
      neckLine: 'M 429 89 L 528 144',
    },
    greenArrow: {
      path: 'M 523 629 L 424 574 L 437 566 C 431 470, 383 414, 324 377 L 352 329 L 408 329 C 410 398, 435 468, 515 521 L 521 516 Z',
      stemPath:
        'M 352 329 L 324 377 C 383 414, 431 470, 437 566 L 515 521 C 435 468, 410 398, 408 329 Z',
      outerHeadPoints: '424,574 523,629 521,516',
      innerHeadPoints: '512,531 514,613 443,573',
      neckLine: 'M 424 574 L 521 516',
    },
    blueArrow: {
      path: 'M 7 327 L 104 269 L 104 284 C 190 327, 263 313, 324 281 L 352 329 L 324 377 C 263 345, 190 331, 104 374 L 106 382 Z',
      stemPath:
        'M 352 329 L 324 281 C 263 313, 190 327, 104 284 L 104 374 C 190 331, 263 345, 324 377 Z',
      outerHeadPoints: '104,269 7,327 106,382',
      innerHeadPoints: '97,367 25,327 95,286',
      neckLine: 'M 104 269 L 106 382',
    },
    dashedArcs: [
      // Blue to Yellow (top-left)
      'M 145 251 C 245 301, 383 221, 389 110',
      // Yellow to Green (right crescent)
      'M 523 189 C 430 250, 430 410, 523 471',
      // Blue to Green (bottom-left)
      'M 144 406 C 243 356, 381 436, 388 547',
    ],
  };
}
