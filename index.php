
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--JQuery Core 3.2.1 -->
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"
                integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
                crossorigin="anonymous"></script>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <!-- Custom Stylesheet -->
        <link rel="stylesheet" href="index.css">
        <title>Matrix Operations</title>
    </head>
    <body>
        <!-- Dynamic Model that will show a variety of content, triggered by errors or successful operations -->
        <div class="modal fade" tabindex="-1" role="dialog"id="data-modal">
            <div class="modal-dialog" role="document" id="data-modal-size">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="dataModalLabel">Error!</h4>
                    </div>
                    <div class="modal-body text-center">
                        <div class="row">
                            <div class="col-xs-12" id="dataModalBody">
                                Sorry you need at least one row and one column to have fun with matrices!
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="modal-close">Close</button>
                    </div>
                </div>
            </div> 
        </div>
        <!-- Navbar -->
        <nav class="navbar navbar-default">
            <div class="container-fluid text-center">
                <h1>Welcome To The Matrix</h1>
            </div>
        </nav>
        <!-- Body container -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 text-center">
                    <h3>Let's have some fun with Matrices!</h3>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <form class="form-horizontal col-xs-offset-4">
                    <div class="form-group">
                        <label for="operation" class="col-xs-3"> Please select an operation </label>
                        <div class="col-xs-3">
                            <select class="form-control" name="operation" id="operation">
                                <option value="add"> Addition </option>
                                <option value="subtract"> Subtraction </option>
                                <option value="multiply"> Multiplication </option>
                                <option value="divide"> Division </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="amount" class="col-xs-4"> How many matrices would you like to work with?  You need a minimum of 2 to complete any operation.</label>
                        <div class="col-xs-2">
                            <input type="number" class="form-control" name="amount" value="2" min="2" id="amount">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="autoload" class="col-xs-4"> Would you like to automatically load data?  We'll generate random numbers based on your 'start' and 'end' values which you can define below.</label>
                        <div class="col-xs-2">
                            <button type="submit" class="btn btn-success btn-lg" name="autoload" id="autoload"> GO! </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="start" class="col-xs-1"> Start </label>
                        <div class="col-xs-2">
                            <input type="number" class="form-control" name="start" value="-100" id="start">
                        </div>
                        <label for="end" class="col-xs-1"> End </label>
                        <div class="col-xs-2">
                            <input type="number" class="form-control" name="end" value="100" id="end">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-warning btn-lg" name="reset" id="reset"> Reset! </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary btn-lg" name="submit" id="btn-submit"> Submit </button>
                        </div>
                    </div>
                </form>
            </div> 
        </div>
        <div class="container-fluid text-center">
            <div class="row">
                <div class="col-xs-12 row-center" id="matrices-container"></div>
            </div>
        </div>
        <script src="dataHandler.js"></script>
    </body>
</html>
