import { Board, Setup, Position, Square, Colored } from './types';

export function setup(setup: Setup): Position | undefined {
  // check for pawns on backranks and kings
  const board: Board = {};
  const kings = { white: false, black: false };
  for (const square in setup.board) {
    const piece = setup.board[square as Square];
    if (!piece) continue;
    if (piece.role == 'king') {
      if (kings[piece.color]) return; // too many kings
      kings[piece.color] = true;
    } else if (piece.role == 'pawn') {
      if (square[1] == '1' || square[1] == '8') return; // pawn on backrank
    }
    board[square as Square] = { role: piece.role, color: piece.color }; // discard promoted
  }
  if (!kings.white || !kings.black) return; // missing king

  return {
    board,
    rules: 'chess',
    ...setup
  };
}
