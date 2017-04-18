
//wait for DOM to be loaded
$( document ).ready(function() {
    console.log("DOM Loaded!");
    
    //get initial amount
    let amount = $('#amount').val();
    
    //render matrices based on default initial value
    renderMatrices(amount);
    
    //get value as changed by user, remove old matrices and render new amount 
    $('#amount').on('change', function() {
        let newAmount  = $(this).val();
        $('#matrices-container').empty();
        renderMatrices(newAmount);
    });
    
    //event handler for automatically loading data into each matrix
    $('#autoload').on('click', function(event) {
        //prevent default actions
        event.preventDefault();
        //get start and end values and convert to int
        let start = parseInt($('#start').val());
        let end = parseInt($('#end').val());
        
        //iterate over table via DOM to fill in random numbers
        $('table').find('tr').each(function(index) {
            $(this).find('td').each(function(index) {
                let randomNum = getRandomNum(start, end);
                $(this).find('input').val(randomNum);
            });
        });
       
    });
    
    //event handler to remove large class styling from modal
    $('#modal-close').on('click', function() {
        setTimeout(function() {
            $('#data-modal-size').removeClass('modal-lg');
        }, 700);
    });
    
    //event handler to reset forms and tables
    $('#reset').on('click', function(event) {
        //prevent default behaviour
        event.preventDefault();
        //reset values on all input and selection fields
        $('#operation').val('add');
        $('#amount').val('2');
        $('#start').val('-100');
        $('#end').val('100');
        //empty all matrices and re-render
        $('#matrices-container').empty();
        renderMatrices(amount);

    });
    
    //event handler to post data to php for processing
    $('#btn-submit').on('click', function(event) {
        
        //stop default behaviour
        event.preventDefault();
        
        //declare variables to be used
        let operation = $('#operation').val();
        let amount = $('#amount').val();
        let matrix1Rows = getRows('matrix-1');
        let matrix1Columns = getColumns('row-1');
        let matrices = [];
       
       
        //rows and column validation
        let matricesValidation = checkRowsColumns(amount, operation);
        //further validation by checking for boolean value of error = false
        if (!matricesValidation[0]) {
            matrices = getMatrices(amount); 
            console.log(matrices);

            //validate data and post
            if(!operation || !amount) {
                alert('Sorry data is missing!');
            } else {
                amount = JSON.stringify(amount);
                operation = JSON.stringify(operation);
                matrices = JSON.stringify(matrices);

                //post using ajax
                $.ajax({
                    type: 'POST',
                    url: 'matrixWork.php',
                    data: {
                        operator: operation,
                        amount: amount,
                        matrices: matrices
                    },
                    success: function(response) {
                        //on success parse the response
                        let parsedResponse = JSON.parse(response);
                        console.log(parsedResponse);
                        
                        //get rows and columns count to populate results table
                        let rows = parsedResponse.length;
                        let columns = parsedResponse[0].length;
                        
                        //create header and body for dynamic modal
                        let header = 'Success!';
                        let body = `
                            <h4>Here's the matrix you ordered!</h4>
                            <table class="table table-bordered row-center matrix result-matrix" id="result-matrix"></table>
                        `;
                        
                        //populate modal and change size based on rows
                        if (columns > 9) {
                            populateDataModal(header, body);
                            $('#data-modal-size').addClass('modal-lg');
                        } else {
                            populateDataModal(header, body);
                        }
                       
                        //append rows and columns to results table.  Clear inputs from td and insert results values
                        $('#result-matrix').append(makeRow(rows));
                        $('#result-matrix').find('tr').append(makeColumns(columns));
                        $('#result-matrix').find('tr').each(function(index) {
                            let counter01 = index;
                            $(this).removeClass('matrix').find('td').each(function(index) {
                                let counter02 = index;
                                $(this).empty().append(parsedResponse[counter01][counter02]);
                            });
                        });
                    },
                    error: function(XMLHttpRequest, errorThrown) {
                        if(errorThrown) {
                            let header = 'Error!';
                            let body = 'Sorry but there was an error processing this data.';
                            populateDataModal(header, body);
                        }  
                    }
                });
            }
        } else {
           let header = 'Error!';
           let body = matricesValidation[1];
           populateDataModal(header, body);
        }
    });
    
    
    //function to render matrices and buttons.  Also sets up required event handlers 
    function renderMatrices(amount) {
        
        for(let i = 1; i <= amount; i++) {
            //append initial 2x2 matrix
            $('#matrices-container').append(`
                <div>
                    <h3 class="matrix-title">Matrix ` +  i  + `</h3>
                    <form class="form-inline">
                        <div class="form-group ops-form">
                            <h5>Rows: </h5>
                            <button type="button" class="btn btn-success btn-sm" id="row-plus-` + i + `"> + </button>
                            <button type="button" class="btn btn-danger btn-sm" id="row-minus-` + i + `"> - </button>
                        </div>
                        <div class="form-group ops-form">
                            <h5>Columns: </h5>
                            <button type="button" class="btn btn-success btn-sm" id="column-plus-` + i + `"> + </button>
                            <button type="button" class="btn btn-danger btn-sm" id="column-minus-` + i + `"> - </button>
                        </div>
                    </form>
                    <table class="table table-bordered row-center matrix" id="matrix-` + i + `">
                        <tr class="matrix-` + i + `" id ="row-` + i + `">
                            <td>
                                <div class="input-group">
                                    <input type="number" class="form-control" value="0">
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="number" class="form-control" value="0">
                                </div>
                            </td>
                        </tr>
                        <tr class="matrix-` + i + `" id ="row-` + i + `a">
                            <td>
                                <div class="input-group">
                                    <input type="number" class="form-control" value="0">
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="number" class="form-control" value="0">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            `);

            //event handler to deal with adding rows
            $('#row-plus-' + i).on('click', function() {
                console.log('row-plus-' + i + ' clicked!');
                let rowData = getRows('matrix-' + i);
                console.log('Rows in matrix-' + i + ' before add: ', rowData);
                let columnData = getColumns('row-' + i);
                console.log('Columns in matrix-' + i + ' before add: ', columnData);
                $('#matrix-' + i).find('tbody').append(makeRow(1));
                $('#matrix-' + i).find('tr:last').append(makeColumns(columnData));

                rowData = getRows('matrix-' + i);
                columnData = getColumns('row-' + i);
                console.log('Rows in matrix-' + i + ' after add: ', rowData);
                console.log('Columns in matrix-' + i + ' after add: ', columnData);
            });

            //event handler to deal with removing rows
            $('#row-minus-' + i).on('click', function() {
               console.log('row-minus-' + i + ' clicked!');
               let rowData = getRows('matrix-' + i);
               console.log('Rows in matrix-' + i + ' before minus: ', rowData);
               let columnData = getColumns('row-' + i);
               console.log('Columns in matrix-' + i + ' before minus: ', columnData);

               //checks and enforces that there is at least one row
               if (rowData === 1) {
                   let header = 'Error!';
                   let body = 'Sorry but you need at least one row to perform matrix operations!';
                   populateDataModal(header, body);
               } else {
                   $('#matrix-' + i).find('tr:last').remove();

                   rowData = getRows('matrix-' + i);
                   columnData = getColumns('row-' + i);

                   console.log('Rows in matrix-' + i + ' after minus: ', rowData);
                   console.log('Columns in matrix-' + i + ' after minus: ', columnData);
               }
            });

            //event handler to deal with adding columns
            $('#column-plus-' + i).on('click', function() {
               console.log('column-plus-' + i + ' clicked!');
               let rowData = getRows('matrix-' + i);
               console.log('Rows in matrix-' + i + ' before add: ', rowData);
               let columnData = getColumns('row-' + i);
               console.log('Columns in matrix-' + i + ' before add: ', columnData);

               $('#matrix-' + i).find('tr').append(makeColumns(1));

               rowData = getRows('matrix-' + i);
               columnData = getColumns('row-' + i);
               console.log('Rows in matrix-' + i + ' after add: ', rowData);
               console.log('Columns in matrix-' + i + ' after add: ', columnData);
            });

            //event handler to deal with removing columns
            $('#column-minus-' + i).on('click', function() {
               console.log('column-minus-' + i + ' clicked!');
               let rowData = getRows('matrix-' + i);
               console.log('Rows in matrix-' + i + ' before minus: ', rowData);
               let columnData = getColumns('row-' + i);
               console.log('Columns in matrix-' + i + ' before minus: ', columnData);

               //checks and enforces that there is at least one column
               if (columnData === 1) {
                   let header = 'Error!';
                   let body = 'Sorry but you need at least one column to perform matrix operations!';
                   populateDataModal(header, body);
               } else {
                   $('#matrix-' + i).find('tr').find('td:last').remove();
                   rowData = getRows('matrix-' + i);
                   columnData = getColumns('row-' + i);
                   console.log('Rows in matrix-' + i + ' after minus: ', rowData);
                   console.log('Columns in matrix-' + i + ' after minus: ', columnData);
               }

            });
        }
    }
    
    //function to generate random numbers based on input
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    //function to populate Modal
    function populateDataModal(header, body) {
       $('#dataModalLabel').empty().append(header);
       $('#dataModalBody').empty().append(body);
       $('#data-modal').modal('show');
    }
    
    //check rows and columns configuration is correct based on operation to be performed
    function checkRowsColumns(amount, operation) {
        let errorStatus = false;
        let errorMsg = 'No Errors';
        let errorArray = [];
        
        for(let i = 1; i < amount; i++) {
            let next = i + 1;
            let tempRowsA = getRows('matrix-' + i);
            let tempColumnsA = $('#matrix-' + i).find('#row-' + i).children().length;
            let tempRowsB = getRows('matrix-' + next);
            let tempColumnsB = $('#matrix-' + next).find('#row-' + next).children().length;
            
            console.log('Matrix-' + i + 'stats: ');
            console.log('Rows: ', tempRowsA, 'Columns: ', tempColumnsA);
            
            console.log('Matrix-' + next + ' stats: ');
            console.log('Rows: ', tempRowsB, 'Columns: ', tempColumnsB, 'Amount: ', amount);
            
            if (operation === 'add' || operation === 'subtract') {
                if (tempRowsA !== tempRowsB || tempColumnsA !== tempColumnsB) {
                    errorStatus = true;
                    errorMsg = 'Addition or Subtraction:  Rows and Columns of all matrices must be equal.';
                } 
            } else if (operation === 'multiply') {
                if (tempColumnsA !== tempRowsB) {
                    errorStatus = true;
                    errorMsg = 'Multiplication: The number of columns in Matrix 1 must be equal to the number of rows in Matrix 2. If you\'re using more that two matrices then the number of columns in Matrix 2 must be equal to the number of rows in Matrix 3 and so on.';
                } 
            } else if (operation === 'divide') {
                if (tempColumnsA !== tempColumnsB) {
                    errorStatus = true;
                    errorMsg = 'Division:  The number of columns in Matrix 1 must be equal to the number of columns in Matrix 2.  If you\'re using more that two matrices then the number of columns in Matrix 2 must be equal to the number of rows in Matrix 3 and so on.';
                }
            }
        }
        errorArray.push(errorStatus);
        errorArray.push(errorMsg);
        return errorArray;
    }
    
    //function to create matrices from table values
    function getMatrices(amount) {
        //temp array to hold all matrices
        let tempMatrices = [];
        //temp array to hold one matrix at a time.
        let tempMatrix = [];
        
        //loop over every matrix
        for(let i = 1; i <= amount; i++) {
            $('#matrix-' + i).find('tr').each(function() {
                //map over each row to return an array
                let values = $(this).find('td').map(function() {
                    return $(this).find('input').val();
                }).get();
                //push rows into a matrix
                tempMatrix.push(values);
            });
            //push all matrices into an array 
            tempMatrices.push(tempMatrix);
            //empty temp matrix so it only holds one matrix at a time
            tempMatrix = [];
        }
        //return all matrices
        return tempMatrices;
    }
    
    //function to get number of rows based on matrix id
    function getRows(matrixId) {
        let rows = $('#' + matrixId).find('tr').length;
        return rows;
    }
    
    //function to get number of columns based on rowId
    function getColumns(rowId) {
        let columns = $('#' + rowId).children().length;
        return columns;
    }
    
    //function to create an empty row
    function makeRow(rows) {
        let html;
        for (let i = 0; i < rows; i++) {
            html += `
                <tr class="table table-bordered row-center matrix"></tr>
            `;
        }
        return html;
    }
    
    //function to create columns that are added to empty or existing rows
    function makeColumns(columns) {
        let html;
        for (let i = 0; i < columns; i++) {
            html += `<td>
                        <div class="input-group">
                            <input type="number" class="form-control" value="0">
                        </div>
                     </td>`;
        }
        return html;
    }
    
});

