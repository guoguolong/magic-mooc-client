(this["webpackJsonpmagic-mooc"]=this["webpackJsonpmagic-mooc"]||[]).push([[1],{395:function(e,n,t){e.exports=t(402)},398:function(e,n,t){},399:function(e,n,t){},402:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(71),i=t.n(c),u=t(18),o=t(44),s=t(31),l=t(82),m=t(81),d=t(17),b=t(45),f=t.n(b),p=t(66),v=t(21),E=t(37),h=t(68),y=t(8),O=t(6),j=(t(398),function(){var e,n=Object(a.useState)({name:"",id:0,summary:"",price:0}),t=Object(v.a)(n,2),c=t[0],i=t[1],s=Object(a.useState)(!1),l=Object(v.a)(s,2),m=l[0],d=l[1],b=Object(a.useState)(""),j=Object(v.a)(b,2),w=j[0],g=j[1],q=Object(o.h)().courseId;(q/=1)&&(e=Object(y.c)(O.b,{variables:{id:q}}));var N=Object(y.b)(O.e),$=Object(v.a)(N,1)[0];return Object(a.useEffect)((function(){e&&e.data&&i(e.data.course.detail)}),[e]),r.a.createElement("div",{className:"form-container"},r.a.createElement("h1",null,"Course Edit"),r.a.createElement(u.b,{to:"/admin"},"[Back to list]"),r.a.createElement(E.d,{enableReinitialize:!0,initialValues:{name:c.name,id:c.id,summary:c.summary,price:c.price},validationSchema:h.a({name:h.b().max(30,"Must be 30 characters or less").required("Title can not be empty"),summary:h.b().max(500,"Must be 500 characters or less").required("Summary can not be empty"),price:h.b().required("Required")}),onSubmit:function(){var e=Object(p.a)(f.a.mark((function e(n,t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.setSubmitting,n.price/=1,e.prev=2,e.next=5,$({variables:{data:n},update:function(e,n){var t=n.data;try{var a=e.readQuery({query:O.c}).course;e.writeQuery({query:O.c,data:{course:a.list.concat([t.course.save])}})}catch(r){}d(!0)}});case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),g(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(n,t){return e.apply(this,arguments)}}()},r.a.createElement(E.c,{className:"course-form form"},m&&r.a.createElement(o.a,{to:"/admin"}),w&&r.a.createElement("div",{className:"error"},w),r.a.createElement("div",{className:"row"},r.a.createElement("label",{htmlFor:"name"},"Title: "),r.a.createElement(E.b,{name:"name",type:"text"}),r.a.createElement(E.a,{name:"name"})),r.a.createElement("div",{className:"row"},r.a.createElement("label",{htmlFor:"summary"},"Intro: "),r.a.createElement(E.b,{name:"summary",as:"textarea"}),r.a.createElement(E.a,{name:"summary"})),r.a.createElement("div",{className:"row"},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"price"},"Price: "),r.a.createElement(E.b,{name:"price",type:"text"})),r.a.createElement("div",null,r.a.createElement(E.a,{name:"price"}))),r.a.createElement("div",{className:"row center"},r.a.createElement("button",{type:"submit"},"Save")))))});t(399);function w(e){var n=e.item,t=Object(y.b)(O.d,{variables:{id:n.id},refetchQueries:[{query:O.c}]}),a=Object(v.a)(t,1)[0];return r.a.createElement("li",null,r.a.createElement("span",null,n.id),r.a.createElement("span",null,r.a.createElement(u.b,{to:"/admin/course/"+n.id},n.name)),r.a.createElement("span",null,"\xa5",n.price),r.a.createElement("span",{className:"summary",title:n.summary},n.summary),r.a.createElement("span",{className:"button",onClick:Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",a());case 1:case"end":return e.stop()}}),e)})))},"[DELETE]"))}var g=function(){var e=Object(a.useState)([]),n=Object(v.a)(e,2),t=n[0],c=n[1],i=Object(y.c)(O.c),o=i.data,s=i.loading,l=i.error;return Object(a.useEffect)((function(){Object(p.a)(f.a.mark((function e(){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o&&o.course&&o.course.list&&(n=o.course.list.map((function(e){return r.a.createElement(w,{key:e.id,item:e})})),c(n));case 1:case"end":return e.stop()}}),e)})))()}),[o]),s?r.a.createElement("p",{className:"loading"},"Loading..."):l?r.a.createElement("p",null,"ERROR: ",l.message):r.a.createElement("div",{className:"course-list"},r.a.createElement("h1",null,"Course List"),r.a.createElement(u.b,{to:"/admin/course"},"[New Course]"),r.a.createElement("ul",null,t))},q=t(61),N=t(63),$=(t(90),new l.a),C=new s.a({cache:$,link:new m.a({uri:q.a.baseApiUrl,headers:{"client-name":"Magic Mooc Admin[web]","client-version":"1.0.0"}})});i.a.render(r.a.createElement(d.a,{client:C},r.a.createElement(u.a,null,r.a.createElement(o.d,null,r.a.createElement(o.b,{path:"/admin/course/:courseId(\\d+)?"},r.a.createElement(j,null)),r.a.createElement(o.b,{path:"/admin"},r.a.createElement(g,null))))),document.getElementById("root")),N.a()},6:function(e,n,t){"use strict";t.d(n,"c",(function(){return p})),t.d(n,"b",(function(){return v})),t.d(n,"f",(function(){return E})),t.d(n,"e",(function(){return h})),t.d(n,"d",(function(){return y})),t.d(n,"a",(function(){return O})),t.d(n,"h",(function(){return j})),t.d(n,"g",(function(){return w})),t.d(n,"i",(function(){return g}));var a=t(9),r=t(10),c=t.n(r);function i(){var e=Object(a.a)(["\n    mutation UpdateTOCData($toc: TOC) {\n        updateTOCData(toc: $toc) @client\n    }\n"]);return i=function(){return e},e}function u(){var e=Object(a.a)(["\n    query FetchActiveTocHash {\n        activeTocHash @client\n    }\n"]);return u=function(){return e},e}function o(){var e=Object(a.a)(["\n    query FetchToc{\n        toc @client\n    }\n"]);return o=function(){return e},e}function s(){var e=Object(a.a)(["\n    query ArticleDetail($id: Int!){\n        article {\n            detail (id: $id){\n                id,name,content\n            }\n        }\n    }\n"]);return s=function(){return e},e}function l(){var e=Object(a.a)(["\n    mutation CourseRemove($id: Int!){\n        course {\n            remove (id: $id){\n                error, message\n            }\n        }\n    }\n"]);return l=function(){return e},e}function m(){var e=Object(a.a)(["\n    mutation CourseSave($data: CourseInputType!){\n        course {\n            save (data: $data){\n                id, name, summary, price\n            }\n        }\n    }\n"]);return m=function(){return e},e}function d(){var e=Object(a.a)(["\n    query CourseSummary($courseId: Int!){\n        course {\n            summary (id: $courseId) {\n                id,name,summary,start_article_id,\n                activeArticle{\n                    id,name,content\n                },\n                articles {\n                    is_open @client, is_active @client, id,name,seq, parent_id,level,children {\n                        is_open @client, is_active @client, id,name,seq,parent_id,level,children {\n                            is_open @client, is_active @client, id,name,seq,parent_id,level\n                        }\n                    }\n                }\n            }\n        }\n    }\n"]);return d=function(){return e},e}function b(){var e=Object(a.a)(["\n    query CourseDetail($id: Int!){\n        course {\n            detail (id: $id){\n                id,name,price,summary\n            }\n        }\n    }\n"]);return b=function(){return e},e}function f(){var e=Object(a.a)(["\n    query CourseList($pageNo: Int){\n        course {\n            list (pageNo: $pageNo){\n                id,name,price,summary\n            }\n        }\n    }\n"]);return f=function(){return e},e}var p=c()(f()),v=c()(b()),E=c()(d()),h=c()(m()),y=c()(l()),O=c()(s()),j=c()(o()),w=c()(u()),g=c()(i())},61:function(e,n,t){"use strict";n.a={baseApiUrl:"http://localhost:4000/graphql"}},63:function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function a(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},90:function(e,n,t){}},[[395,3,0,6]]]);
//# sourceMappingURL=admin.1d0c3f28.1c3dd72f.chunk.js.map