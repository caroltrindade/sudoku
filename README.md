# Sudoku board validation

My approach was transform the columns and sub-boxes into rows and handle the validation always using rows, since the arrays work easily with lines.
Besides, I follow the single responsibility role and aimed to reuse functions.
I also added more test cases to:
  1. Validate the function responsible to verify the board's structure;
  2. Validate the function responsible to verify the board's sub-boxes;
     I found a test that already was supposed to validate this scenario (non_valid_board_4) but this test wasn't working properly, it does not have two 1s in the same sub-box.
     For this reason, I created another test case (non_valid_board_5).