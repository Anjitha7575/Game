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

    $scope.$watch('file', function(newfile, oldfile) {
        if(angular.equals(newfile, oldfile) ){
            return;
        }
        firstPhaseService.upload(newfile).then(function(res){
            console.log("result", res);
        })
        $scope.imgs.push({url:$scope.filepreview});
    });

    ////////////////////////////////////////////////////////////////Taking Photo from Camera(Not working)////////////////////////////////////////////////////////////////////////////////////////

    //$scope.snapshot = function() {
    //    if (localMediaStream) {
    //        ctx.drawImage(video, 0, 0);
    //        var img = document.getElementById('CaptureImage');
    //        // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
    //        img.src = canvas.toDataURL('image/webp');
    //    }
    //}
    //
    //$scope.hasGetUserMedia = function() {
    //    // Note: Opera builds are unprefixed.
    //    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    //    navigator.mozGetUserMedia || navigator.msGetUserMedia);
    //}
    //
    //$scope.onFailSoHard = function(){
    //
    //}
    //
    //$scope.start = function() {
    //    $scope.showVid = false;
    //    if ( $scope.hasGetUserMedia()) {
    //        if (navigator.webkitGetUserMedia)
    //            navigator.getUserMedia = navigator.webkitGetUserMedia;
    //        //var getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
    //
    //
    //        //var gumOptions = { video: true, toString: function () { return 'video'; } };
    //        if (navigator.getUserMedia) {
    //            navigator.getUserMedia({ video: true, audio: true }, function (stream) {
    //                if (navigator.webkitGetUserMedia) {
    //                    video.src = window.webkitURL.createObjectURL(stream);
    //                } else {
    //                    video.src = stream; // Opera
    //                }
    //                localMediaStream = stream;
    //            }, $scope.onFailSoHard);
    //        } else {
    //            video.src = 'somevideo.webm'; // fallback.
    //        }
    //    }
    //}
    //
    //$scope.stop = function() {
    //    video = document.getElementById('sourcevid');
    //    video.src = "";
    //}
    //
    //$scope.ResizeCanvas = function() {
    //    canvas.height = video.videoHeight;
    //    canvas.width = video.videoWidth;
    //}
    //
    //$scope.ctx = null;
    //$scope.canvas = document.getElementById("tmpImage");
    //$scope.localMediaStream = null;
    //var video = document.querySelector('video');

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////........................Game.....................////////////////////////////////////////////
                        W = 800;
                        H = 600;
                        var canvas = document.getElementById("canvas");
                        canvas.width = W;
                        canvas.height = H;
                        if(canvas) {
                            var ctx = canvas.getContext("2d");
                            var counter = 30;

                            // game variables
                            var startingScore = 50;
                            var continueAnimating = false;
                            var score;

                            // block variables
                            var blockWidth = 40;
                            var blockHeight = 45;
                            var blockSpeed = 10;
                            var block = {
                                x: 0,
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
                                rock.speed = 0.2 + Math.random() * 0.5;
                            }
                            document.onkeydown = function (event) {
                                if (event.keyCode == 39) {
                                    block.x += block.blockSpeed;
                                    if (block.x >= canvas.width - block.width) {
                                        continueAnimating = false;
                                        alert("Completed with a score of " + score);
                                    }
                                } else if (event.keyCode == 37) {
                                    block.x -= block.blockSpeed;
                                    if (block.x <= 0) {
                                        block.x = 0;
                                    }
                                }
                            }
                            document.onmousedown = function (e) {
                                block.x = e.clientX - 10;
                                block.y = e.clientY - 230;
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
                                    if (counter === 0 && score < 1000) {
                                        alert('sorry, out of time');
                                        clearInterval(counter);
                                        continueAnimating = false;
                                        $scope.gameOn = false;
                                    }
                                    if (counter === 0 && score >= 1000) {
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
                                var img = new Image;
                                img.src = "assets/images/s3.png";
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
    $scope.menu = true;
    $scope.showVid = true;
    $scope.imgs =[];
}]);