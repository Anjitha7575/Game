gameApp.directive("fileinput", [function() {
    return {
        scope: {
            fileinput: "=",
            filepreview: "="
        },
        link: function(scope, element, attributes) {
            element.bind("change", function(changeEvent) {
                scope.fileinput = changeEvent.target.files[0];
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        scope.filepreview = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(scope.fileinput);
            });
        }
    }
}]).directive('drawCircle', function() {
    return {
        scope: {
            x: '@x',
            y: '@y'
        },
        link: function(scope, element, attrs) {
            var x = parseInt(scope.x);
            var y = parseInt(scope.y);
            var canvas = element.parent();
            var ctx = canvas[0].getContext("2d");
            var image = new Image();
            image.src = "assets/images/lipO.png";
            image.onload = function(){
                ctx.drawImage(image, 50, 60, 260,50);
            };
        }
    }
});