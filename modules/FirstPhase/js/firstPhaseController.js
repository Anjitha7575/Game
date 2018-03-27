var gameApp = angular.module('vidTApp.firstPhase.firstPhaseController',[]).controller('firstPhaseController',['$scope','$rootScope','$uibModal','firstPhaseService','$timeout',function($scope, $rootScope, $uibModal, firstPhaseService, $timeout) {

    $scope.startGame = function(){
        $scope.menu = false;
    }

    $scope.playGame = function(){
        $scope.gameOn = true;
        doCount();
        score = startingScore
        block.x = 0;
        for (var i = 0; i < rocks.length; i++) {
            resetRock(rocks[i]);
        }
        if (!continueAnimating) {
            continueAnimating = true;
            animate();
        };
    }
  
    //////////////////////////////////////////////////////////////////////........................Game.....................////////////////////////////////////////////
                        W = document.getElementById('canvas').width;
                        H = document.getElementById('canvas').height;
                        var canvas = document.getElementById("canvas");
                        canvas.width = W;
                        canvas.height = H;
                            var ctx = canvas.getContext("2d");
                            var counter = 15;

                            // game variables
                            var startingScore = 0;
                            var continueAnimating = false;
                            var score;

                            // block variables
                            var blockWidth = 40;
                            var blockHeight = 45;
                            var blockSpeed = 100;
                            var block = {
                                x: canvas.width - blockWidth,
                                y: canvas.height - blockHeight,
                                width: blockWidth,
                                height: blockHeight,
                                blockSpeed: blockSpeed
                            }

                            // rock variables
                            var rockWidth = 25;
                            var rockHeight = 25;
                            var totalRocks = 6;
                            var rocks = [];
                            for (var i = 0; i < totalRocks; i++) {
                                addRock(i);
                            }

                            function addRock(i) {
                                var rock = {
                                    src: "assets/images/s4.png",
                                    width: rockWidth,
                                    height: rockHeight
                                }
                                resetRock(rock);
                                rocks.push(rock);
                            }

                            function resetRock(rock) {
                                rock.x = Math.random() * (canvas.width - rockWidth);
                                rock.y = 15 + Math.random() * 30;
                                rock.speed = 0.2 + Math.random() * 1;
                            }
                            document.onkeydown = function (event) {
                                if (event.keyCode == 39) {
                                    block.x += block.blockSpeed;
                                    if (block.x >= canvas.width - block.width) {
                                        block.x = canvas.width - block.width;
                                    }
                                } else if (event.keyCode == 37) {
                                    block.x -= block.blockSpeed;
                                    if (block.x <= 0) {
                                        block.x = 0;
                                    }
                                }else if (event.keyCode == 40) {
                                    block.y += block.blockSpeed;
                                    if (block.y >= canvas.height - block.height) {
                                        block.y = canvas.height - block.height;
                                    }
                                }else if (event.keyCode == 38) {
                                    block.y -= block.blockSpeed;
                                    if (block.y <= 0) {
                                        block.y = 0;
                                    }
                                }
                            }

                            function  getMousePos(canvas, evt) {
                              var rect = canvas.getBoundingClientRect(), // abs. size of element
                                  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
                                  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

                              return {
                                x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
                                y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
                              }
                            }

                            document.onmousedown = function (e) {
                                var pos= getMousePos(canvas,e);
                                block.x = pos.x;
                                block.y = pos.y;
                                if (block.x >= canvas.width - block.width) {
                                        block.x = canvas.width - block.width;
                                }
                                if (block.x <= 0) {
                                        block.x = 0;
                                }
                                if (block.y >= canvas.height - block.height) {
                                        block.y = canvas.height - block.height;
                                }
                                if (block.y <= 0) {
                                        block.y = 0;
                                }
                            }

                            function animate() {
                                if (continueAnimating) {
                                    requestAnimationFrame(animate);
                                }
                                for (var i = 0; i < rocks.length; i++) {
                                    var rock = rocks[i];
                                    if (isColliding(rock, block)) {
                                        score += 10;
                                        resetRock(rock);
                                    }
                                    rock.y += rock.speed;

                                    // if the rock is below the canvas,
                                    if (rock.y > canvas.height) {
                                        resetRock(rock);
                                    }
                                }
                                drawAll();
                            }

                            function isColliding(a, b) {
                                return !(
                                b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
                            }

                            function doCount(){

                                setInterval(function () {
                                    counter--;
                                    if (counter >= 0) {
                                        span = document.getElementById("count");
                                        span.innerHTML = counter;
                                    }
                                    if (counter === 0 && score < 500) {
                                        alert('sorry, out of time');
                                        clearInterval(counter);
                                        continueAnimating = false;
                                        $scope.gameOn = false;
                                    }
                                    if (counter === 0 && score >= 500) {
                                        alert('Winner...!!');
                                        clearInterval(counter);
                                        continueAnimating = false;
                                        $scope.gameOn = false;
                                    }
                                }, 1000);
                            }

                            function drawAll() {

                                // clear the canvas
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                img = new Image;
                                img.src = "assets/images/q1.jpg";
                                //img.onload = function(){
                                    ctx.drawImage(img, block.x, block.y, block.width, block.height);
                                 // }
                                

                                var img1 = new Image;

                                for (var i = 0; i < rocks.length; i++) {
                                    var rock = rocks[i];
                                    img1.src = rock.src;
                                    ctx.drawImage(img1, rock.x, rock.y, rock.width, rock.height);
                                }

                                // draw the score
                                ctx.font = "14px Times New Roman";
                                ctx.fillStyle = "black";
                                ctx.fillText("Score: " + score, 10, 15);
                            }
                        
                        var scaleFactor= 1;
                        window.addEventListener('resize',
                        function(evt) {
                        // calculate a scale factor to keep a correct aspect ratio.
                        scaleFactor= Math.min(window.innerWidth/W, window.innerHeight/H);
                        // make the canvas conform to the new scaled size.
                        canvas.width = W*scaleFactor;
                        canvas.height = H*scaleFactor;
                        // get the scaled canvas context.
                        ctx = canvas.getContext( '2d' );
                        },
                        false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.gameOn = false;
    $scope.menu = false;
    $scope.showVid = true;
    $scope.imgs =[];
}]);