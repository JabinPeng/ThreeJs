import storey3 from '../images/storey3.png'
import floor from '../images/floor3.png'
import floorA from '../images/floorA.jpg'
import floor_top from '../images/louding.jpg'
import reset from '../images/reset.png'
import connection from '../images/connection.png'
import usage from '../images/usage.png'
import edit from '../images/edit.png'
import alarm from '../images/alarm.png'
import dalou from '../images/louceng.jpg'

  for(var storey=0;storey<5;storey++){

  }
  let Aobject = {
    objects: [
      //墙体
      {
        show: true,
        uuid: "",
        name: 'wall',
        objType: 'wall',
        thick: 1,
        length: 100,
        height: 240,
        wallData: [
          {//wall1
            uuid: "",
            name: 'wall1_1',
            style: {
              imgurl: dalou,
              // skinColor: 0x8ac9e2,
            },
            skin: {
              opacity:1,
              skin_left: {
                skinColor: 0x98750f,
                imgurl: dalou
              }
            },
            thick: 1,
            height: 240,
            startDot: {
              x: -500,
              y: 240,
              z: -350
            },
            endDot: {
              x: 500,
              y: 240,
              z: -350
            },
            rotation: [{ direction: 'x', degree: 0 }] // 旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
          },
          {//wall1
            uuid: "",
            name: 'wall2_1',
            thick: 1,
            height: 240,
            skin: {
              opacity:1,
              skin_fore: {
                skinColor: 0x94623b,
                imgurl: dalou
              }
            },
            startDot: {
              x: 500,
              y: 240,
              z: -350
            },
            endDot: {
              x: 500,
              y: 240,
              z: 350
            },
            rotation: [{ direction: 'x', degree: 0 }] // 旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
          },
          {//wall1
            uuid: "",
            name: 'wall3_1',
            thick: 1,
            height: 240,
            skin: {
              opacity:1,
              skin_right: {
                skinColor: 0x94623b,
                imgurl: dalou
              }
            },
            startDot: {
              x: 500,
              y: 240,
              z: 350
            },
            endDot: {
              x: -500,
              y: 240,
              z: 350
            },
            rotation: [{ direction: 'x', degree: 0 }] // 旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
          },
          {//wall1
            uuid: "",
            name: 'wall4_1',
            thick: 1,
            height: 240,
            skin: {
              opacity:1,
              skin_behind: {
                skinColor: 0x94623b,
                imgurl: dalou
              }
            },
            startDot: {
              x: -500,
              y: 240,
              z: 350
            },
            endDot: {
              x: -500,
              y: 240,
              z: -350
            },
            rotation: [{ direction: 'x', degree: 0 }] // 旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
          }
        ],
        style: {
          skinColor: 0x8ac9e2
        }
      },
      //地板
      // {
      //   show: true,
      //   uuid: "",
      //   name: 'floor',
      //   objType: 'floor',
      //   length: 3000,
      //   width: 3000,
      //   height: 10,
      //   rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
      //   x: 0,
      //   y: 120,
      //   z: 0,
      //   style: {
      //     skinColor: 0x8ac9e2,
      //     skin: {
      //       skin_up: {
      //         skinColor: 0x98750f,
      //         imgurl: floorA,
      //         // repeatx: true,
      //         // repeaty: true,
      //         width: 3000,
      //         height: 3000
      //       },
      //       skin_down: {
      //         skinColor: 0x8ac9e2,
      //       },
      //       skin_fore: {
      //         skinColor: 0x8ac9e2,
      //       }
      //     }
      //   }
      // },
      {
        show: true,
        uuid: "",
        name: 'floor',
        objType: 'floor',
        length: 1000,
        width: 700,
        height: 0,
        rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
        x: 0,
        y: 120+6*240-10,
        z: 0,
        style: {
          skinColor: 0x8ac9e2,
          skin: {
            skin_up: {
              skinColor: 0x98750f,
              imgurl: floor_top,
              // repeatx: true,
              // repeaty: true,
              width: 200,
              height: 200
            },
            skin_down: {
              skinColor: 0x8ac9e2,
            },
            skin_fore: {
              skinColor: 0x8ac9e2,
            }
          }
        }
      },
      //gltf园区
      {
        show: true,
        uuid: "garden",
        name: 'garden',
        objType: 'gltfObj',
        x: -1900,
        y: 0,
        z: 0,
        rx: 1.5 * Math.PI,
        ry: 0,
        rz: Math.PI,
        scale: 30,
        url: '/obj/garden/scene.gltf'
      },
      {
        show: true,
        uuid: "tree",
        name: 'tree',
        objType: 'gltfObj',
        x: -1800,
        y: 150,
        z: 0,
        rx: 1.5 * Math.PI,
        ry: 0,
        rz: Math.PI,
        scale: 200,
        url: '/obj/tree/scene.gltf'
      },
      {
        show: true,
        uuid: "tree",
        name: 'tree',
        objType: 'gltfObj',
        x: -1800,
        y: 150,
        z: 1200,
        rx: 1.5 * Math.PI,
        ry: 0,
        rz: Math.PI,
        scale: 200,
        url: '/obj/tree/scene.gltf'
      },
      {
        show: true,
        uuid: "che",
        name: 'che',
        objType: 'gltfObj',
        x: -1250,
        y: 150,
        z: 600,
        rx: 1.5 * Math.PI,
        ry: 0,
        rz: Math.PI,
        scale: 100,
        url: '/obj/che/scene.gltf'
      },
      {
        show: true,
        uuid: "che2",
        name: 'che2',
        objType: 'gltfObj',
        x: -2500,
        y: 300,
        z: -550,
        rx: 1.5 * Math.PI,
        ry: 0,
        rz: Math.PI,
        scale: 100,
        url: '/obj/che2/scene.gltf'
      }
    ],
    events: {
      dbclick: [
        {
          obj_name: "doorRight",
          obj_uuid: "",
          obj_event: function (_obj) {
            openRightDoor(_obj, function () { });
            console.dir(_obj)
          }
        },
        {
          obj_name: "doorLeft",
          obj_uuid: "",
          obj_event: function (_obj) {
            var doorstate = "close";
            var tempobj = null;
            if (_obj.doorState != null && typeof (_obj.doorState) != 'undefined') {
              doorstate = _obj.doorState;
              tempobj = _obj.parent;
            } else {
              console.log("add parent");
              var _objparent = _obj.parent;
              tempobj = new THREE.Object3D();
              tempobj.position.set(_obj.position.x + _obj.geometry.parameters.width / 2, _obj.position.y, _obj.position.z);
              _obj.position.set(-_obj.geometry.parameters.width / 2, 0, 0);
              tempobj.add(_obj);
              _objparent.add(tempobj);
            }
            _obj.doorState = (doorstate == "close" ? "open" : "close");
            new createjs.Tween(tempobj.rotation).to({
              y: (doorstate == "close" ? -0.25 * 2 * Math.PI : 0 * 2 * Math.PI)
            }, 10000, createjs.Ease.elasticOut);
          }
        },
        {
          obj_name: "cabinetdoor3_1",
          obj_uuid: "",
          obj_event: function (_obj) {
            opcabinetdoor(_obj);
          }
        },
        {
          findObject:function(_objname){//查找某一类符合名称的对象
            if (_objname.indexOf("wall") >= 0) {
              return true;
            } else {
              return false;
            }
          },
          obj_uuid: "",
          obj_event: (_obj, _) => {
            let reg1 = /([^_]+)$/;
            let storey = _obj.name.match(reg1)[1];
            let reg2 = /([/][^/]+)$/
            alert('点击进去第'+storey+'层');
            console.log(window.location.href.replace(reg2, ""))
            // window.location.href =  ''
            _.isFlag.path = '/storey'
            _.isFlag.storeyId = storey
          }
        },
        {
          findObject:function(_objname){//查找某一类符合名称的对象
            if (_objname.indexOf("cabinet") >= 0 && _objname.indexOf("door") >= 0) {
              return true;
            } else {
              return false;
            }
          },
          obj_uuid: "",
          obj_event: function (_obj) {
            opcabinetdoor(_obj);
          }
        },
        {
          findObject: function (_objname) {//查找某一类符合名称的对象
            if (_objname.indexOf("equipment") >= 0 && _objname.indexOf("card") >= 0) {
              return true;
            } else {
              return false;
            }
          },
          obj_uuid: "",
          obj_event: function (_obj) {
            var cardstate = "in";
            if (_obj.cardstate != null && typeof (_obj.cardstate) != 'undefined') {
              cardstate = _obj.cardstate;
            } else {
              _obj.cardstate = "out";
            }
            new createjs.Tween(_obj.position).to({
              x: (cardstate == "in" ? _obj.position.x - 50 : _obj.position.x + 50),
            }, 1000,createjs.Ease.linear).call(function () { _obj.cardstate = cardstate == "in" ? "out" : "in"; });
          }
        }
      ],
      mouseDown:[],
      mouseUp: [
        {
          findObject:function(_objname){//查找某一类符合名称的对象
            if (_objname.indexOf("wall") >= 0) {
              return true;
            } else {
              return false;
            }
          },
          obj_uuid: "",
          obj_event: function (_obj) {
            console.log(_obj);
          }
        }
      ],
      mouseMove:  [
        {
          findObject:function(_objname){//查找某一类符合名称的对象
            if (_objname.indexOf("wall") >= 0) {
              return true;
            } else {
              return false;
            }
          },
          obj_uuid: "",
          obj_event: function (_obj) {
            // _obj.color.setHex('')
            //不停循环的动画已经是在不断渲染 因此无需在添加一个渲染
            //renderer.render( scene, camera );
            // console.log(_obj)
          }
        }
      ]
    },
    btns: [
      {
        btnid: "btn_reset",
        btnTitle: "场景复位",
        btnimg: reset,
        event: function () {
        }
      },
      {
        btnid: "btn_connection",
        btnTitle: "走线管理",
        btnimg: connection,
        event: function () {
        }
      },
      {
        btnid: "btn_usage",
        btnTitle: "机柜利用率",
        btnimg: usage,
        event: function () {
        }
      },
      {
        btnid: "btn_edit",
        btnTitle: "拖拽机柜",
        btnimg: edit,
        event: function () {
        }
      },
      {
        btnid: "btn_alarm",
        btnTitle: "告警巡航",
        btnimg: alarm,
        event: function () {
          var mainCamera = msj3DObj.commonFunc.findObject("mainCamera");//主摄像机
          var doorRight = msj3DObj.commonFunc.findObject("doorRight");
          mainCamera.lookAt(doorRight.position);
          console.log(createjs)
          new createjs.Tween(mainCamera.position).to({
            x:-300, y:200, z:-700,
          }, 5000,createjs.Ease.linear).call(function () {

            openRightDoor(msj3DObj.commonFunc.findObject("doorRight"), function () {
              var cabinet3_1 = msj3DObj.commonFunc.findObject("cabinet3_1");
              mainCamera.lookAt(cabinet3_1.position);
              new createjs.Tween(mainCamera.position).to({
                x: -300, y: 150, z: -200,
              }, 5000,createjs.Ease.linear).call(function () {
                mainCamera.lookAt(cabinet3_1.position);
              });
            });
          });


        }
      },
    ]
  }
  for (var i = 1; i <=6;i++){
    if (i != 1) {
      Aobject.objects[0].wallData.push({
        show: true,
        copyfrom: 'wall1',
        name: 'wall1'+'_'+ i,
        uuid: '',
        objType: 'cloneObj',
        thick: 1,
        height: 240,
        skin: {
          opacity:1,
          skin_left: {
            skinColor: 0x98750f,
            imgurl: dalou
          }
        },
        startDot: {
          x: -500,
          y: 240*i,
          z: -350
        },
        endDot: {
          x: 500,
          y: 240*i,
          z: -350
        },
      });
      Aobject.objects[0].wallData.push({
        show: true,
        copyfrom: 'wall2',
        name: 'wall2'+'_'+ i,
        uuid: '',
        objType: 'cloneObj',
        thick: 1,
        height: 240,
        skin: {
          opacity:1,
          skin_fore: {
            skinColor: 0x98750f,
            imgurl: dalou
          }
        },
        startDot: {
          x: 500,
          y: 240*i,
          z: -350
        },
        endDot: {
          x: 500,
          y: 240*i,
          z: 350
        },
        rotation: [{ direction: 'x', degree: 0 }]
      });
      Aobject.objects[0].wallData.push({
        show: true,
        copyfrom: 'wall3',
        name: 'wall3'+'_'+ i,
        uuid: '',
        objType: 'cloneObj',
        thick: 1,
        height: 240,
        skin: {
          opacity:1,
          skin_right: {
            skinColor: 0x98750f,
            imgurl: dalou
          }
        },
        startDot: {
          x: 500,
          y: 240*i,
          z: 350
        },
        endDot: {
          x: -500,
          y: 240*i,
          z: 350
        },
        rotation: [{ direction: 'x', degree: 0 }]
      });
      Aobject.objects[0].wallData.push({
        show: true,
        copyfrom: 'wall4',
        name: 'wall4'+'_'+ i,
        uuid: '',
        objType: 'cloneObj',
        thick: 1,
        height: 240,
        skin: {
          opacity:1,
          skin_behind: {
            skinColor: 0x98750f,
            imgurl: dalou
          }
        },
        startDot: {
          x: -500,
          y: 240*i,
          z: 350
        },
        endDot: {
          x: -500,
          y: 240*i,
          z: -350
        },
        rotation: [{ direction: 'x', degree: 0 }]
      });
    }
  }

function opcabinetdoor(_obj) {
  console.log(_obj)
  var doorstate = "close";
  var tempobj = null;
  if (_obj.doorState != null && typeof (_obj.doorState) != 'undefined') {
    doorstate = _obj.doorState;
    tempobj = _obj.parent;
  } else {
    var _objparent = _obj.parent;
    tempobj = new THREE.Object3D();
    tempobj.position.set(_obj.position.x, _obj.position.y, _obj.position.z + _obj.geometry.parameters.depth / 2);
    _obj.position.set(0, 0, -_obj.geometry.parameters.depth / 2);
    tempobj.add(_obj);
    _objparent.add(tempobj);
  }
  _obj.doorState = (doorstate == "close" ? "open" : "close");
  new createjs.Tween(tempobj.rotation).to({
    y: (doorstate == "close" ? 0.25 * 2 * Math.PI : 0 * 2 * Math.PI)
  }, 1000, createjs.Ease.linear);
}
function openRightDoor(_obj,func) {
  var doorstate = "close";
  var tempobj = null;
  if (_obj.doorState != null && typeof (_obj.doorState) != 'undefined') {
    doorstate = _obj.doorState;
    tempobj = _obj.parent;
  } else {
    var _objparent = _obj.parent;
    tempobj = new THREE.Object3D();
    tempobj.position.set(_obj.position.x - _obj.geometry.parameters.width / 2, _obj.position.y, _obj.position.z);
    _obj.position.set(_obj.geometry.parameters.width / 2, 0, 0);
    tempobj.add(_obj);
    _objparent.add(tempobj);
  }
  _obj.doorState = (doorstate == "close" ? "open" : "close");
  new createjs.Tween(tempobj.rotation).to({
    y: (doorstate == "close" ? 0.25 * 2 * Math.PI : 0 * 2 * Math.PI)
  }, 10000, createjs.Ease.elasticOut);
}


export {
  Aobject
}
