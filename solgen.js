var SOLGEN = function () {
    var reginRatio = 0.7;
    var cellRatio = 0.8;
    var cellSize;
    var borderSize = 3;
    var posX0, posY0;
    var colors = ["#f00", "#00f", "#ff0", "#0f0"];
    var playerIndex = 0;
    var selectedIndex = null;
    var score = [0, 0, 0, 0];
    var no = [];
    var drawRegion = function () {
        var screenW = $(window).width() * reginRatio;
        var screenH = $(window).height() * reginRatio;
        var cW = screenH > screenW / 2 ? screenW : screenH * 2;
        var cH = cW / 2;
        cellSize = cW / 8;
        posX0 = ($(window).width() - cW) / 2;
        posY0 = ($(window).height() - cH) / 2;
        $("#solgen").css({
            width: cW,
            height: cH,
            position: "absolute",
            left: posX0,
            top: posY0,
            border: borderSize + "px solid gray"
        });
        $("#scorePan").css({
            width: posX0,
            height: cH,
            position: "absolute",
            top: posY0,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: cellSize * 0.3
        });
        var routes = [27, 28, 29, 30, 31, 23, 15, 7, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 25, 26];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                var id = "";
                var background = "";
                var border = borderSize + "px solid gray";
                for (var k = 0; k < routes.length; k++) {
                    if (routes[k] == (i * 8 + j)) {
                        id = "cell" + k;
                        if (k % 5 == 0) border = borderSize + "px solid " + colors[(4 - k / 5) % 4];
                        if (k % 5 == 2) background = "#ff08";
                        if (k % 5 == 3) background = "#80f8";
                        break;
                    }
                }
                $("<div>")
                    .css({
                        width: cellSize - 2 * borderSize,
                        height: cellSize - 2 * borderSize,
                        border: border,
                        position: "absolute",
                        background: background,
                        left: j * cellSize,
                        top: i * cellSize,
                        zIndex: 1
                    })
                    .attr('id', id)
                    .appendTo($("#solgen"));
            }
        }
        $("<div>")
            .css({
                width: cellSize * 3 - 2 * borderSize,
                height: cellSize - 2 * borderSize,
                position: "absolute",
                background: colors[0],
                left: cellSize + borderSize,
                top: 2 * cellSize + borderSize,
                zIndex: 2,
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize * 3 - 2 * borderSize,
                height: cellSize - 2 * borderSize,
                position: "absolute",
                background: colors[1],
                left: cellSize + borderSize,
                top: cellSize + borderSize,
                zIndex: 2,
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize * 3 - 2 * borderSize,
                height: cellSize - 2 * borderSize,
                position: "absolute",
                background: colors[2],
                left: 4 * cellSize + borderSize,
                top: cellSize + borderSize,
                zIndex: 2,
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize * 3 - 2 * borderSize,
                height: cellSize - 2 * borderSize,
                position: "absolute",
                background: colors[3],
                left: 4 * cellSize + borderSize,
                top: 2 * cellSize + borderSize,
                zIndex: 2,
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize * 2 - borderSize * 3,
                height: cellSize * 0.8 - borderSize * 3,
                position: "absolute",
                background: "#fff",
                fontSize: cellSize * 0.45,
                textAlign: "center",
                color: "#80f",
                lineHeight: (cellSize * 0.8 - borderSize * 3) + "px",
                border: borderSize + "px solid gray",
                left: borderSize + cellSize * 3,
                top: borderSize + cellSize * 1.6,
                zIndex: 3
            })
            .text("SOLGEN")
            .appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize * 0.9 - borderSize * 3,
                height: cellSize * 0.9 - borderSize * 3,
                position: "absolute",
                background: "#fff",
                zIndex: 10,
                border: borderSize + "px solid gray",
                left: cellSize * 1.6,
                top: cellSize * 1.6
            })
            .attr('id', 'puzzle')
            .appendTo($("#solgen"));
        $("<button>")
            .css({
                width: cellSize * 0.7,
                height: cellSize * 0.7,
                position: "absolute",
                background: "#fff",
                fontSize: cellSize * 0.3,
                cursor: "pointer",
                zIndex: 999,
                textAlign: "center",
                left: cellSize * 5.5,
                top: cellSize * 1.65
            })
            .attr('disabled', true)
            .attr('id', 'btn')
            .text("GO")
            .appendTo($("#solgen"))
            .click(function () {
                if (!selectedIndex) {
                    alert("Select Item!");
                    return;
                }
                $("#bcell" + playerIndex + "_" + selectedIndex).find('img').attr('src', 'a' + (selectedIndex * 1 + 1) + ".png");
                $("#bcell" + playerIndex + "_" + selectedIndex).css('opacity', 0);
                var step = $("#puzzle img:eq(0)").attr('data');
                if (num == 2) {
                    num = 1;
                    move(step);
                    $("#puzzle img:eq(0)").remove();
                    $("#num").text($("#num").text() - step);
                } else if (num == 1) {
                    num = 0;
                    move(step);
                    $("#puzzle img:eq(0)").remove();
                    selectedIndex = null;
                    playerIndex = (playerIndex * 1 + 1) % 4;
                    if (no.indexOf(playerIndex) > -1) playerIndex = (playerIndex * 1 + 1) % 4;
                    $("#btn")[0].disabled = true;
                    $("#btn").css('color', "gray");
                    puzzlePanDraw1(playerIndex);
                }
            });
        $("<div>")
            .css({
                width: cellSize / 4,
                height: cellSize / 3,
                position: "absolute",
                background: colors[0],
                left: cellSize + borderSize,
                top: cellSize + 2 * borderSize + cellSize / 6,
                zIndex: 5,
                border: 2 * borderSize + "px solid white",
                borderLeft: "none"
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize / 4,
                height: cellSize / 3,
                position: "absolute",
                background: colors[0],
                right: cellSize + borderSize,
                bottom: cellSize + 2 * borderSize + cellSize / 6,
                zIndex: 5,
                border: 2 * borderSize + "px solid white",
                borderRight: "none"
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize / 3,
                height: cellSize / 4,
                position: "absolute",
                background: colors[0],
                top: cellSize + borderSize,
                right: 3 * cellSize + 2 * borderSize + cellSize / 6,
                zIndex: 5,
                border: 2 * borderSize + "px solid white",
                borderTop: "none"
            }).appendTo($("#solgen"));
        $("<div>")
            .css({
                width: cellSize / 3,
                height: cellSize / 4,
                position: "absolute",
                background: colors[0],
                bottom: cellSize + borderSize,
                left: 3 * cellSize + 2 * borderSize + cellSize / 6,
                zIndex: 5,
                border: 2 * borderSize + "px solid white",
                borderBottom: "none"
            }).appendTo($("#solgen"));
        for (var i = 0; i < 20; i++) {
            $("<div>").css({
                    color: colors[0],
                    position: "absolute",
                    fontSize: cellSize * 0.2,
                    zIndex: 5,
                    left: parseFloat($("#cell" + i).css('left')) + cellSize * 0.14,
                    bottom: parseFloat($("#cell" + i).css('bottom')) + cellSize * 0.14,
                    display: 'none'
                })
                .attr('id', 'n0' + i)
                .appendTo($("#solgen"));
            $("<div>").css({
                    color: colors[1],
                    position: "absolute",
                    fontSize: cellSize * 0.2,
                    zIndex: 5,
                    top: parseFloat($("#cell" + i).css('top')) + cellSize * 0.14,
                    left: parseFloat($("#cell" + i).css('left')) + cellSize * 0.14,
                    display: 'none'
                })
                .attr('id', 'n1' + i)
                .appendTo($("#solgen"));
            $("<div>").css({
                    color: colors[2],
                    position: "absolute",
                    fontSize: cellSize * 0.2,
                    zIndex: 5,
                    top: parseFloat($("#cell" + i).css('top')) + cellSize * 0.14,
                    right: parseFloat($("#cell" + i).css('right')) + cellSize * 0.14,
                    display: 'none'
                })
                .attr('id', 'n2' + i)
                .appendTo($("#solgen"));
            $("<div>").css({
                    color: colors[3],
                    position: "absolute",
                    fontSize: cellSize * 0.2,
                    zIndex: 5,
                    bottom: parseFloat($("#cell" + i).css('bottom')) + cellSize * 0.14,
                    right: parseFloat($("#cell" + i).css('right')) + cellSize * 0.14,
                    display: 'none'
                })
                .attr('id', 'n3' + i)
                .appendTo($("#solgen"));
        }
    }
    var drawItem = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var cell = $("<div>")
                    .css({
                        width: cellSize/1.5 - borderSize * 6,
                        height: cellSize/1.5 - borderSize * 6,
                        position: "absolute",
                        border: 1 * borderSize + "px solid " + colors[i],
                        cursor: "pointer",
                        zIndex: 3,
                        opacity: 0,
                        left: parseFloat($("#cell" + 5 * ((4 - i) % 4)).css('left')) + borderSize,
                        top: parseFloat($("#cell" + 5 * ((4 - i) % 4)).css('top')) + borderSize,
                    })
                    .attr('id', "cell" + i + "_" + j)
                    .attr('class', 'cell')
                    .attr('pos', -1)
                    .appendTo($("#solgen"));
                var img = $("<img>")
                    .attr('src', 'a' + (j + 1) + '.png')
                    .css({
                        width: "100%",
                        height: "100%"
                    })
                    .appendTo(cell);
            }
            var cell = $("<div>")
                .css({
                    width: cellSize / 3,
                    height: cellSize / 3,
                    position: "absolute",
                    cursor: "pointer",
                    zIndex: 3,
                    left: cellSize * 1.1 + borderSize + i * (cellSize * 1.3 / 3),
                    bottom: cellSize * 1.05 + borderSize,
                })
                .attr('class', 'bcell')
                .attr('id', "bcell0_" + (3 - i))
                .appendTo($("#solgen"));
            var img = $("<img>")
                .attr('src', 'a' + (4 - i) + '.png')
                .css({
                    width: "100%",
                    height: "100%"
                })
                .appendTo(cell);
            var cell = $("<div>")
                .css({
                    width: cellSize / 3,
                    height: cellSize / 3,
                    position: "absolute",
                    cursor: "pointer",
                    zIndex: 3,
                    right: cellSize * 4.5 + borderSize + i * (cellSize * 1.3 / 3),
                    top: cellSize * 1.05 + borderSize,
                })
                .attr('class', 'bcell')
                .attr('id', "bcell1_" + (3 - i))
                .appendTo($("#solgen"));
            var img = $("<img>")
                .attr('src', 'a' + (4 - i) + '.png')
                .css({
                    width: "100%",
                    height: "100%"
                })
                .appendTo(cell);
            var cell = $("<div>")
                .css({
                    width: cellSize / 3,
                    height: cellSize / 3,
                    position: "absolute",
                    cursor: "pointer",
                    zIndex: 3,
                    right: cellSize * 1.1 + borderSize + i * (cellSize * 1.3 / 3),
                    top: cellSize * 1.05 + borderSize,
                })
                .attr('class', 'bcell')
                .attr('id', "bcell2_" + (3 - i))
                .appendTo($("#solgen"));
            var img = $("<img>")
                .attr('src', 'a' + (4 - i) + '.png')
                .css({
                    width: "100%",
                    height: "100%"
                })
                .appendTo(cell);
            var cell = $("<div>")
                .css({
                    width: cellSize / 3,
                    height: cellSize / 3,
                    position: "absolute",
                    cursor: "pointer",
                    zIndex: 3,
                    left: cellSize * 4.5 + borderSize + i * (cellSize * 1.3 / 3),
                    bottom: cellSize * 1.05 + borderSize,
                })
                .attr('class', 'bcell')
                .attr('id', "bcell3_" + (3 - i))
                .appendTo($("#solgen"));
            var img = $("<img>")
                .attr('src', 'a' + (4 - i) + '.png')
                .css({
                    width: "100%",
                    height: "100%"
                })
                .appendTo(cell);
        }
        $(".cell").click(function () {
            var src = $(this).find('img').attr('src');
            if (src.indexOf('s') > -1) $(this).find('img').attr('src', src.substr(1));
        });
        $("#solgen>div>img").click(function () {
            var c = $(this).attr('src');
            if ($(this).parent().attr('id').indexOf(playerIndex + "_") < 0) return;
            if (c.indexOf('s') > -1) $(this).attr('src', c.substr(1));
            else {
                $("#solgen>div>img").each(function () {
                    var cc = $(this).attr('src');
                    if (cc.indexOf('s') > -1)
                        $(this).attr('src', cc.substr(1));
                });
                $(this).attr('src', 's' + c);
                var id = $(this).parent().attr('id');
                selectedIndex = id.substr(id.length - 1, 1);
            }
        });
    }
    var puzzlePanDraw1 = function (i) {
        $("#puzzle").empty();
        $("<div>")
            .css({
                width: "100%",
                height: "100%",
                fontSize: cellSize * 0.2,
                background: "white",
                cursor: "pointer",
                fontWeight: "bold",
                color: colors[i],
                textAlign: "center",
                lineHeight: cellSize * 0.9 - borderSize * 3 + "px"
            })
            .text("CLICK!")
            .appendTo($("#puzzle"))
            .click(function () {
                var con = $(this);
                con.css({
                    opacity: 0.5,
                    cursor: "wait"
                });
                setTimeout(function () {
                    num = 2;
                    $("#btn")[0].disabled = false;
                    $("#btn").css('color', colors[playerIndex]);
                    puzzlePanDraw2();
                }, 100);
            });
        selectedIndex = null;
    }
    var puzzlePanDraw2 = function () {
        $("#puzzle").empty();
        var c = $("<div>").css({
            width: "50%",
            height: "100%",
            float: "left"
        }).appendTo($("#puzzle"));
        var c1 = $("<div>").css({
            width: "100%",
            height: (c.width() * 2 - 1) / 2,
            borderBottom: "1px solid gray",
            borderRight: "1px solid gray"
        }).appendTo(c);
        var c2 = $("<div>").css({
            width: "100%",
            height: (c.width() * 2 - 1) / 2,
            borderRight: "1px solid gray"
        }).appendTo(c);
        var v1 = parseInt(Math.random() * 5.99 + 1);
        var v2 = parseInt(Math.random() * 5.99 + 1);
        $("<div>").attr('id', 'num').css({
            width: c.width() - 1,
            height: "100%",
            float: "left",
            textAlign: "center",
            lineHeight: c.height() + "px"
        }).appendTo($("#puzzle")).text(v1 + v2);
        $("<img>").css({
            width: "100%",
            height: "100%"
        }).attr('src', 'c' + v1 + '.png').attr('data', v1).appendTo(c1);
        $("<img>").css({
            width: "100%",
            height: "100%"
        }).attr('src', 'c' + v2 + '.png').attr('data', v2).appendTo(c2);
    }
    var move = function (step) {
        var currentPos = $("#cell" + playerIndex + "_" + selectedIndex).attr('pos');
        var targetPos = currentPos * 1 + step * 1;
        if (targetPos < 21) {
            var num = (targetPos + 5 * ((4 - playerIndex) % 4)) % 20;
            if (selectedIndex == 3 && (num % 5 == 3) && num < 15) {
                targetPos = currentPos * 1 + step * 1 + 5;
                num = (targetPos + 5 * ((4 - playerIndex) % 4)) % 20;
            } else {
                if (selectedIndex != 2) {
                    var f = false;
                    for (var i = 1; i <= step; i++) {
                        var targetPos = currentPos * 1 + i * 1;
                        var num = (targetPos + 5 * ((4 - playerIndex) % 4)) % 20;
                        var left = parseFloat($("#cell" + num).css('left')) + borderSize;
                        var top = parseFloat($("#cell" + num).css('top')) + borderSize;
                        var nnn = 0;
                        $(".cell").each(function () {
                            if (parseFloat($(this).css('left')) == left && parseFloat($(this).css('top')) == top && $(this).css('opacity') == 1) {
                                var tindex = $(this).attr('id').substr(4, 1);
                                if (tindex != playerIndex) {
                                    nnn++;
                                }
                            }
                        });
                        if (nnn > 1) {
                            f = true;
                            break;
                        }
                    }
                    if (f) return;
                }
            }
            var left = parseFloat($("#cell" + num).css('left')) + borderSize;
            var top = parseFloat($("#cell" + num).css('top')) + borderSize;
            var count = [0, 0, 0, 0];
            count[playerIndex] = 1;
            var nn = 0;
            $(".cell").each(function () {
                if (parseFloat($(this).css('left')) == left && parseFloat($(this).css('top')) == top && $(this).css('opacity') == 1) {
                    var tindex = $(this).attr('id').substr(4, 1);
                    if (tindex == playerIndex || num % 5 == 2) {
                        count[tindex] = count[tindex] * 1 + 1;
                        nn++;
                    } else {
                        $(this).css({
                            opacity: 0,
                            left: parseFloat($("#cell" + 5 * ((4 - tindex) % 4)).css('left')) + borderSize,
                            top: parseFloat($("#cell" + 5 * ((4 - tindex) % 4)).css('top')) + borderSize,
                        }).attr('pos', -1);
                        $("#bcell" + tindex + "_" + $(this).attr('id').substr(6, 1)).css('opacity', 1);
                    }
                }
            });
            if (selectedIndex == 0) {
                var u1 = currentPos * 1 + step * 1 + 1;
                var u2 = (u1 + 5 * ((4 - playerIndex) % 4)) % 20;
                var u3 = parseFloat($("#cell" + u2).css('left')) + borderSize;
                var u4 = parseFloat($("#cell" + u2).css('top')) + borderSize;
                $(".cell").each(function () {
                    if (parseFloat($(this).css('left')) == u3 && parseFloat($(this).css('top')) == u4 && $(this).css('opacity') == 1) {
                        var tindex = $(this).attr('id').substr(4, 1);
                        if (tindex != playerIndex && u2 % 5 != 2) {
                            $(this).css({
                                opacity: 0,
                                left: parseFloat($("#cell" + 5 * ((4 - tindex) % 4)).css('left')) + borderSize,
                                top: parseFloat($("#cell" + 5 * ((4 - tindex) % 4)).css('top')) + borderSize,
                            }).attr('pos', -1);
                            $("#bcell" + tindex + "_" + $(this).attr('id').substr(6, 1)).css('opacity', 1);
                        }
                    }
                });
            }
            if (selectedIndex == 1) {
                var u1 = currentPos * 1 + step * 1 + 2;
                var u2 = (u1 + 5 * ((4 - playerIndex) % 4)) % 20;
                var u3 = parseFloat($("#cell" + u2).css('left')) + borderSize;
                var u4 = parseFloat($("#cell" + u2).css('top')) + borderSize;
                $(".cell").each(function () {
                    if (parseFloat($(this).css('left')) == u3 && parseFloat($(this).css('top')) == u4 && $(this).css('opacity') == 1) {
                        var tindex = $(this).attr('id').substr(4, 1);
                        if (tindex != playerIndex && u2 % 5 != 2) {
                            $(this).css({
                                opacity: 0,
                                left: parseFloat($("#cell" + 5 * ((4 - tindex) % 4)).css('left')) + borderSize,
                                top: parseFloat($("#cell" + 5 * ((4 - tindex) % 4)).css('top')) + borderSize,
                            }).attr('pos', -1);
                            $("#bcell" + tindex + "_" + $(this).attr('id').substr(6, 1)).css('opacity', 1);
                        }
                    }
                });
            }
            $("#cell" + playerIndex + "_" + selectedIndex).css({
                    opacity: 1,
                    left: left,
                    top: top
                })
                .attr('pos', targetPos);
            if (nn > 0) {
                for (var i = 0; i < 4; i++) {
                    if (count[i] > 0) $("#n" + i + num).css('display', 'block').text(count[i]);
                    else $("#n" + i + num).css('display', 'none');
                }
            }

            if (num % 5 == 3) {
                var f = true;
                for (var i = 0; i < 4 && selectedIndex != i; i++) {
                    var c1 = $("#cell" + playerIndex + "_" + i).attr('pos');
                    var c2 = (c1 + 5 * ((4 - playerIndex) % 4)) % 20;
                    if (c2 % 5 != 3) f = false;
                }
                if (f) {
                    for (var i = 0; i < 4 && i != playerIndex; i++) {
                        for (var j = 0; j < 4; j++) {
                            var p1 = $("#cell" + i + "_" + j).attr('pos');
                            var p2 = (p1 + 5 * ((4 - playerIndex) % 4)) % 20;
                            if (p2 % 5 == 2) continue;
                            $("#cell" + i + "+" + j).css({
                                opacity: 0,
                                left: parseFloat($("#cell" + 5 * ((4 - i) % 4)).css('left')) + borderSize,
                                top: parseFloat($("#cell" + 5 * ((4 - i) % 4)).css('top')) + borderSize,
                            }).attr('pos', -1);
                            $("#bcell" + i + "_" + $(this).attr('id').substr(6, 1)).css('opacity', 1);
                        }

                    }
                }
            }

            /*             var num1 = (currentPos + 5*((4-playerIndex)%4))%20;
                        if(num1>-1){
                            var left1 = parseFloat($("#cell"+num1).css('left'))+borderSize;
                            var top1 = parseFloat($("#cell"+num1).css('top'))+borderSize;
                            var count1 = [0,0,0,0];
                            var nn1 = 0;
                            $(".cell").each(function(){
                                if(parseFloat($(this).css('left'))==left1&&parseFloat($(this).css('top'))==top1&&$(this).css('opacity')==1){
                                    var tindex = $(this).attr('id').substr(4,1);
                                    count1[tindex] = count1[tindex]*1+1;
                                    nn1 ++;
                                }
                            });
                            console.log(count1);
                            for(var i=0;i<4;i++){
                                $("#n"+i+num1).css('display','none');
                                if(count1[i]>0&&nn1>1) $("#n"+i+num1).css('display','block').text(count1[i]);
                            }
                        } */
        } else if (targetPos == 21) {
            score[playerIndex] = score[playerIndex] * 1 + 1;
            $("#cell" + playerIndex + "_" + selectedIndex).remove();
        }
        for (var i = 0; i < 4; i++) {
            if (score[i] == 4 && !(no.indexOf(i) > -1)) {
                no.push(i);
                $("<div>").text("Player " + (no.length + 1)).appendTo($("#scorePan"));
            }
        }
        if (no.length == 3) {
            for (var i = 0; i < 4; i++) {
                if (no.indexOf(i) > -1) continue;
                $("<div>").text("Player 4").appendTo($("#scorePan"));
            }
        }
    }
    return {
        init: function () {
            drawRegion();
            drawItem();
            puzzlePanDraw1(playerIndex);
        }
    }

}();