<?php
$amount = 0;
$operator = '';
$matrices = [];
$resultMatrix = [];


$required = array('operator','amount', 'matrices');

foreach($required as $field) {
    if(empty($_POST[$field])) {
       $data = 'Error: '.$field.' is empty!'; 
       echo json_encode($data);
    } else {
        global $amount, $operator, $matrices;
        $operator = json_decode($_POST['operator'], true);
        $amount = json_decode($_POST['amount'], true);
        $matrices = json_decode($_POST['matrices'], true);
    }
}

if($operator === 'add') {
    global $amount;
    
    for($i = 1; $i < $amount; $i++) {
        if($i === 1) {
            global $matrices;
            $matrixA = $matrices[$i - 1];
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $matrixAColumns; $k++) {
                    global $resultMatrix;
                    $resultMatrix[$j][$k] = $matrixA[$j][$k] + $matrixB[$j][$k];
                }
            }
        } elseif($i >= 2) {
            global $matrices, $resultMatrix;
            $matrixA = $resultMatrix;
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $matrixAColumns; $k++) {
                    
                    $resultMatrix[$j][$k] = $matrixA[$j][$k] + $matrixB[$j][$k];
                }
            }
        }  
    }
    
} elseif($operator === 'subtract') {
    global $amount;
    
    for($i = 1; $i < $amount; $i++) {
        if($i === 1) {
            global $matrices;
            $matrixA = $matrices[$i - 1];
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $matrixAColumns; $k++) {
                    global $resultMatrix;
                    $resultMatrix[$j][$k] = $matrixA[$j][$k] - $matrixB[$j][$k];
                }
            }
        } elseif($i >= 2) {
            global $matrices, $resultMatrix;
            $matrixA = $resultMatrix;
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $matrixAColumns; $k++) {
                    
                    $resultMatrix[$j][$k] = $matrixA[$j][$k] - $matrixB[$j][$k];
                }
            }
        }  
    }
} elseif ($operator === 'multiply') {
    global $amount;
    
    for($i = 1; $i < $amount; $i++) {
        if($i === 1) {
            global $matrices;
            $matrixA = $matrices[$i - 1];
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $matrixBColumns; $k++) {
                    for($l = 0; $l < $matrixAColumns; $l++) {
                        global $resultMatrix;
                        //[$j][$k] is result position, [$j][$l] is matrixA position, [$l][$k] is matrixB position
                        $resultMatrix[$j][$k] += $matrixA[$j][$l] * $matrixB[$l][$k];
                    }
                }
            }
        } elseif($i >= 2) {
            global $matrices, $resultMatrix;
            $matrixA = $resultMatrix;
            //empty the resultMatrix
            $resultMatrix = [];
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $matrixBColumns; $k++) {
                    for($l = 0; $l < $matrixAColumns; $l++) {
                        //[$j][$k] is result position, [$j][$l] is matrixA position, [$l][$k] is matrixB position
                        $resultMatrix[$j][$k] += $matrixA[$j][$l] * $matrixB[$l][$k];
                    }
                }
            }
        }  
    }
} elseif ($operator === 'divide') {
    global $amount;
    
    for($i = 1; $i < $amount; $i++) {
        if($i === 1) {
            global $matrices;
            $matrixA = $matrices[$i - 1];
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
            $transposeMatrixB = [];
            
            //transpose matrixB
            for($m = 0; $m < $matrixBRows; $m++) {
                for($n = 0; $n < $matrixBColumns; $n++) {
                    $transposeMatrixB[$n][$m] = $matrixB[$m][$n];
                }
            }
            
            $transposeMatrixBRows = count($transposeMatrixB);
            $transposeMatrixBColumns = count($transposeMatrixB[0]);
            
            //multiply matrices
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $transposeMatrixBColumns; $k++) {
                    for($l = 0; $l < $matrixAColumns; $l++) {
                        global $resultMatrix;
                        //[$j][$k] is result position, [$j][$l] is matrixA position, [$l][$k] is matrixB position
                        $resultMatrix[$j][$k] += $matrixA[$j][$l] * $transposeMatrixB[$l][$k];
                    }
                }
            }
        } elseif($i >= 2) {
            global $matrices, $resultMatrix;
            $matrixA = $resultMatrix;
            //empty the resultMatrix
            $resultMatrix = [];
            $matrixB = $matrices[$i];

            $matrixARows = count($matrixA);
            $matrixAColumns = count($matrixA[0]);
            
            $matrixBRows = count($matrixB);
            $matrixBColumns = count($matrixB[0]);
            
             $transposeMatrixB = [];
            
            //transpose matrixB
            for($m = 0; $m < $matrixBRows; $m++) {
                for($n = 0; $n < $matrixBColumns; $n++) {
                    $transposeMatrixB[$n][$m] = $matrixB[$m][$n];
                }
            }
            
            $transposeMatrixBRows = count($transposeMatrixB);
            $transposeMatrixBColumns = count($transposeMatrixB[0]);
            
            for($j = 0; $j < $matrixARows; $j++) {
                for($k = 0; $k < $transposeMatrixBColumns; $k++) {
                    for($l = 0; $l < $matrixAColumns; $l++) {
                        //[$j][$k] is result position, [$j][$l] is matrixA position, [$l][$k] is matrixB position
                        $resultMatrix[$j][$k] += $matrixA[$j][$l] * $transposeMatrixB[$l][$k];
                    }
                }
            }
        }  
    }
}
   
echo json_encode($resultMatrix);

?>

