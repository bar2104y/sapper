(window.webpackJsonptry1=window.webpackJsonptry1||[]).push([[0],{16:function(e,t,i){},17:function(e,t,i){e.exports=i(43)},22:function(e,t,i){},41:function(e,t,i){},43:function(e,t,i){"use strict";i.r(t);var a=i(0),s=i.n(a),n=i(13),c=i.n(n),h=i(7),r=i(8),l=i(11),o=i(9),d=i(10),p=(i(22),i(1)),u=(i(41),function(e){function t(){return Object(h.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"mainMenuConatainer"},s.a.createElement("div",{className:"actionButton",onClick:this.props.go,"data-to":"play"},s.a.createElement("p",null,"\u0418\u0433\u0440\u0430\u0442\u044c")),s.a.createElement("div",{className:"actionButton",onClick:this.props.go,"data-to":"leaders"},s.a.createElement("p",null,"\u041b\u0438\u0434\u0435\u0440\u044b")),s.a.createElement("div",{className:"actionButton",onClick:this.props.share,"data-to":"share"},s.a.createElement("p",null,"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f")))}}]),t}(s.a.Component)),f=function(e){var t=e.id,i=e.go,a=e.fetchedUser;return s.a.createElement(p.Panel,{id:t},s.a.createElement(p.PanelHeader,null,"\u0421\u0430\u043f\u0435\u0440"),a&&s.a.createElement(p.Group,{title:"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c!"},s.a.createElement(p.ListItem,{before:a.photo_200?s.a.createElement(p.Avatar,{src:a.photo_200}):null,description:a.city&&a.city.title?a.city.title:""},"".concat(a.first_name," ").concat(a.last_name)),s.a.createElement(u,{go:i})))},v=i(12),m=i.n(v),k=(i(42),i(6)),b=(i(16),function(e){function t(e){var i;return Object(h.a)(this,t),(i=Object(l.a)(this,Object(o.a)(t).call(this,e))).resetData=i.resetData.bind(Object(k.a)(i)),i.resetData(),i.getPosByIndex=i.getPosByIndex.bind(Object(k.a)(i)),i.selectRect=i.selectRect.bind(Object(k.a)(i)),i.genArea=i.genArea.bind(Object(k.a)(i)),i.isMine=i.isMine.bind(Object(k.a)(i)),i.isClear=i.isClear.bind(Object(k.a)(i)),i.getMinesInBlock=i.getMinesInBlock.bind(Object(k.a)(i)),i.winGame=i.winGame.bind(Object(k.a)(i)),i.filedGame=i.filedGame.bind(Object(k.a)(i)),i}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.canvas=this.refs.canvas,this.ctx=this.refs.canvas.getContext("2d"),this.canvas.addEventListener("click",this.selectRect),this.createCanvas()}},{key:"componentDidUpdate",value:function(){this.resetData()}},{key:"resetData",value:function(){this.canvSize=.9*window.innerWidth,this.lineWidth=2,this.areaSize=10,this.step=(this.canvSize-2*this.lineWidth)/this.areaSize,this.area=[],this.firstPress=!0,this.score=this.areaSize*this.areaSize,this.openedMines=[],this.areaOpen=[];for(var e=0;e<this.areaSize;e++){this.areaOpen[e]=[];for(var t=0;t<this.areaSize;t++)this.areaOpen[e][t]=0}}},{key:"getPosByIndex",value:function(e){return e*this.step+this.lineWidth}},{key:"createCanvas",value:function(){this.ctx.fillStyle="#9E9E9E",this.ctx.fillRect(0,0,this.canvSize,this.canvSize),this.ctx.beginPath(),this.ctx.lineWidth=this.lineWidth;for(var e=this.lineWidth;e<=this.canvSize;e+=this.step)this.ctx.moveTo(0,e),this.ctx.lineTo(this.canvSize,e),this.ctx.moveTo(e,0),this.ctx.lineTo(e,this.canvSize);this.ctx.strokeStyle="#333",this.ctx.stroke()}},{key:"selectRect",value:function(e){this.ctx.beginPath(),this.ctx.fillStyle="#5E5E5E";var t=e.clientX-e.target.offsetLeft,i=e.clientY-e.target.offsetTop,a=Math.floor(t/this.step),s=Math.floor(i/this.step);t=this.getPosByIndex(a),i=this.getPosByIndex(s),this.firstPress?(this.ctx.fillRect(t,i,this.step,this.step),this.firstPress=!1,this.genArea(a,s),this.areaOpen[a][s]=2,this.openBlock(a,s),this.lastblock=[a+1,s+1]):(this.areaOpen[this.lastblock[0]][this.lastblock[1]]<2&&(this.ctx.fillStyle="#9E9E9E",this.ctx.fillRect(this.getPosByIndex(this.lastblock[0]),this.getPosByIndex(this.lastblock[1]),this.step,this.step)),this.lastblock=[a,s],this.areaOpen[a][s]<2&&(this.ctx.fillStyle="#7E7E7E",this.ctx.fillRect(t,i,this.step,this.step))),this.ctx.lineWidth=this.lineWidth/2;for(var n=this.lineWidth;n<=this.canvSize;n+=this.step)this.ctx.moveTo(0,n),this.ctx.lineTo(this.canvSize,n),this.ctx.moveTo(n,0),this.ctx.lineTo(n,this.canvSize);this.ctx.stroke()}},{key:"genArea",value:function(e,t){for(var i,a,s=[],n=0;n<this.areaSize;n++){s[n]=[];for(var c=0;c<this.areaSize;c++)s[n][c]=0}for(var h=0;h<this.areaSize;)i=Math.floor(10*Math.random()),a=Math.floor(10*Math.random()),i===e&&a===t||0!==s[i][a]||(s[i][a]=1,h++);this.area=s}},{key:"isMine",value:function(){var e=this.lastblock[0],t=this.lastblock[1],i=this.getPosByIndex(e),a=this.getPosByIndex(t);if(this.ctx.fillStyle="darkred",this.ctx.fillRect(i,a,this.step,this.step),this.areaOpen[e][t]=3,this.openedMines.push([e,t]),this.openedMines.length===this.areaSize){for(var s=!0,n=0;n<this.openedMines.length;n++)0===this.area[this.openedMines[n][0]][this.openedMines[n][1]]&&(s=!1);s&&this.winGame()}}},{key:"isClear",value:function(){var e=this.lastblock[0],t=this.lastblock[1];if(1===this.area[e][t])this.filedGame();else if(0===this.area[e][t]||3===this.areaOpen[e][t]){if(3===this.areaOpen[e][t])for(var i=0;i<this.openedMines.length;i++)this.openedMines[i][0]===e&&this.openedMines[i][1]===t&&this.openedMines.splice(i,1);this.openBlock(e,t),this.score--}for(var a=0,s=0;s<this.areaSize;s++)for(var n=0;n<this.areaSize;n++)2===this.areaOpen[s][n]&&a++;a===this.areaSize*this.areaSize-this.areaSize&&this.winGame(),document.getElementById("scores").innerHTML=this.score}},{key:"getMinesInBlock",value:function(e,t){return e<0||t<0||e>=this.areaSize||t>=this.areaSize?0:1===this.area[e][t]?1:0}},{key:"getMinesAround",value:function(e,t){var i=0;return i+=this.getMinesInBlock(e+1,t-1),i+=this.getMinesInBlock(e+1,t),i+=this.getMinesInBlock(e+1,t+1),i+=this.getMinesInBlock(e,t-1),i+=this.getMinesInBlock(e,t+1),i+=this.getMinesInBlock(e-1,t-1),i+=this.getMinesInBlock(e-1,t),i+=this.getMinesInBlock(e-1,t+1)}},{key:"openBlock",value:function(e,t){if(e<0||t<0||e>=this.areaSize||t>=this.areaSize)return 0;this.areaOpen[e][t]=2;var i=this.getPosByIndex(e),a=this.getPosByIndex(t);if(this.ctx.fillStyle="#5E5E5E",this.ctx.fillRect(i,a,this.step,this.step),0===this.getMinesAround(e,t)){try{0===this.area[e+1][t+1]&&2!==this.areaOpen[e+1][t+1]&&this.openBlock(e+1,t+1)}catch(s){}try{0===this.area[e+1][t]&&2!==this.areaOpen[e+1][t+1]&&this.openBlock(e+1,t)}catch(s){}try{0===this.area[e+1][t-1]&&2!==this.areaOpen[e+1][t-1]&&this.openBlock(e+1,t-1)}catch(s){}try{0===this.area[e][t+1]&&2!==this.areaOpen[e][t+1]&&this.openBlock(e,t+1)}catch(s){}try{0===this.area[e][t-1]&&2!==this.areaOpen[e][t-1]&&this.openBlock(e,t-1)}catch(s){}try{0===this.area[e-1][t+1]&&2!==this.areaOpen[e-1][t+1]&&this.openBlock(e-1,t+1)}catch(s){}try{0===this.area[e-1][t]&&2!==this.areaOpen[e-1][t]&&this.openBlock(e-1,t)}catch(s){}try{0===this.area[e-1][t-1]&&2!==this.areaOpen[e-1][t-1]&&this.openBlock(e-1,t-1)}catch(s){}}else this.ctx.fillStyle="whitesmoke",this.ctx.font="bold "+Math.floor(this.step/1.5)+"pt sans-serif",this.ctx.textBaseline="center",this.ctx.fillText(this.getMinesAround(e,t),i+this.step/4,a+this.step/1.1)}},{key:"winGame",value:function(){this.ctx.fillStyle="green",this.ctx.fillRect(0,0,this.canvSize,this.canvSize)}},{key:"filedGame",value:function(){this.ctx.fillStyle="darkred",this.ctx.fillRect(0,0,this.canvSize,this.canvSize)}},{key:"render",value:function(){return s.a.createElement(p.Panel,{id:this.props.id},s.a.createElement(p.PanelHeader,null,"\u0421\u0430\u043f\u0435\u0440"),s.a.createElement("div",null,s.a.createElement("div",{className:"topMenu"},s.a.createElement("div",{id:"scores"},this.score),s.a.createElement("div",{id:"time"},"\u0421\u0430\u043f\u0451\u0440")),s.a.createElement("div",{className:"gameContainer"},s.a.createElement("canvas",{id:"canvas",ref:"canvas",width:this.canvSize,height:this.canvSize})),s.a.createElement("div",{className:"buttonContainer"},s.a.createElement("div",{onClick:this.isMine},"\u041c\u0438\u043d\u0430"),s.a.createElement("div",{onClick:this.isClear},"\u041f\u0443\u0441\u0442\u043e")),s.a.createElement("div",{className:"backBtn",onClick:this.props.go,"data-to":"home"},"\u0414\u043e\u043c\u043e\u0439")))}}]),t}(s.a.Component)),y=function(e){function t(e){var i;return Object(h.a)(this,t),(i=Object(l.a)(this,Object(o.a)(t).call(this,e))).leadersList=[],i}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return s.a.createElement(p.Panel,{id:this.props.id},s.a.createElement(p.PanelHeader,null,"\u0421\u0430\u043f\u0435\u0440 - \u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u043b\u0438\u0434\u0435\u0440\u043e\u0432"),s.a.createElement(p.Group,{title:"\u0422\u043e\u043f-20"},s.a.createElement(p.Cell,null,"HackerOK")))}}]),t}(s.a.Component),g=function(e){function t(e){var i;return Object(h.a)(this,t),(i=Object(l.a)(this,Object(o.a)(t).call(this,e))).go=function(e){i.setState({activePanel:e.currentTarget.dataset.to})},i.share=function(e){m.a.send("VKWebAppShare",{link:"https://vk.com/app7094427"})},i.state={activePanel:"home",fetchedUser:null},i}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.a.send("VKWebAppInit",{}),m.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:t.detail.data});break;default:console.log(t.detail.type)}}),m.a.send("VKWebAppGetUserInfo",{})}},{key:"render",value:function(){return s.a.createElement(p.View,{activePanel:this.state.activePanel},s.a.createElement(f,{id:"home",fetchedUser:this.state.fetchedUser,go:this.go,share:this.share}),s.a.createElement(b,{id:"play",go:this.go}),s.a.createElement(y,{id:"leaders",go:this.go}))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(g,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.abc8fee4.chunk.js.map