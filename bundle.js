!function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {i: r, l: !1, exports: {}};
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
            return e[t]
        }.bind(null, o));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function (e, t) {
    let n = "https://newsapi.org/v2/top-headlines?q=it&country=us&category=business&apiKey=261f191c064f425baafde212648635d8",
        r = 0;

    function o(e) {
        $.ajax({
            url: e, method: "GET", dataType: "json", beforeSend: function () {
                $("#loader").show()
            }, complete: function () {
                $("#loader").hide(), $("#getMore").show()
            }, success: function (e) {
                let t = "";
                "" !== (t = function (e) {
                    r += 5;
                    let t = "";
                    for (let n in e) {
                        if (t += `\n                        <h4 style=" width: 800px ; text-align: justify">${e[n].title}</h4>\n                        <img src="${e[n].urlToImage}"  class="responsive-img">\n                        <p style=" width: 600px ; text-align: justify">${e[n].description}</p>\n                        <p style=" width: 600px ; text-align: justify">${e[n].content}</p>\n                        <p>Published on : ${e[n].publishedAt}</p>\n                        <a href="${e[n].url}" class="btn">Read more</a>\n                        `, n >= r - 1) break;
                        19 === r && (r = 0)
                    }
                    return t
                }(e.articles)) ? ($("#newsResults").html(t), M.toast({
                    html: "here we go !!!",
                    classes: "green"
                })) : ($("#newsResults").html(""), M.toast({html: "This news isn't available", classes: "red"}))
            }, error: function () {
                $("#newsResults").html(""), M.toast({html: "error found ", classes: "red"})
            }
        })
    }

    $(document).ready(function () {
        $("#getMore").hide(), o(n), $("#getMore").on("click", function (e) {
            e.preventDefault(), o(n)
        }), $("#searchBtn").on("click", function (e) {
            e.preventDefault(), r = 0;
            let t = $("#searchquery").val();
            n = "https://newsapi.org/v2/top-headlines?q=" + t + "&country=us&category=business&apiKey=261f191c064f425baafde212648635d8", "" !== t ? o(n) : M.toast({
                html: "input can't be empty",
                classes: "red"
            })
        })
    })
})]);