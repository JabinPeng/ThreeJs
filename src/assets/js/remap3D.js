import * as THREE from 'three'
import OrbitControls from "three/examples/js/controls/OrbitControls"
import FBXLoader from "three/examples/js/loaders/FBXLoader"
import GLTFLoader from "three/examples/js/loaders/GLTFLoader"

import behind from "../images/nx.jpg"
import front from "../images/px.jpg"
import left from "../images/pz.jpg"
import right from "../images/nz.jpg"
import up from "../images/py.jpg"
import down from "../images/ny.jpg"
var isOne = 0
var dbclick =0;
function strToDom (arg) {
  var objE = document.createElement("div")
  objE.innerHTML = arg
  return objE.childNodes
}
export class remap3D {
  constructor (isFlag) {
    this.msj3D = null
    this.camera = null
    this.isFlag = isFlag
    console.log(this.isFlag)
    this.p1 = {
      x:0,
      y:0,
      z:0
    }

    this.p2 = {
      x:300,
      y:300,
      z:0
    }
  }
  start () {
    var _this = this;
    _this.initCamera()
    _this.initThree(_this.fId)
    _this.initScene()
    _this.initHelpGrid()
    _this.initLight()
    // _this.addTestObj()
    _this.objList.forEach(function (v, i) {
      _this.InitAddObject(v)
    })
    _this.initMouseCtrl()
    _this.addBtns(_this.btns)
    _this.animation()
  }

  initmsj3D (_fId, _option,_datajson) {
    this.option = {};
    this.option.antialias = _option.antialias || true;//刷新色
    this.option.clearCoolr = _option.clearCoolr || 0x1b7ace;//刷新色
    this.option.showHelpGrid = _option.showHelpGrid || false;//刷新色
    this.option.divWidth = _option.divWidth || 800;//刷新色
    this.option.divHeight = _option.divHeight || 600;//刷新色
    //对象
    this.fId = _fId;
    this.width = this.option.divWidth;
    this.height = this.option.divHeight;
    this.renderer = null;//渲染器
    this.camera = null;//摄像机
    this.scene = null;//场景
    this.SELECTED=null;
    this.objects = [];
    this.mouseClick = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.controls = null;//鼠标控制器
    this.objList = _datajson.objects;//对象列表
    this.eventList = _datajson.events;//事件对象列表
    this.btns = _datajson.btns;//按钮列表
  }

  initThree () {
    var _this = this;
    _this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: _this.option.antialias });
    _this.renderer.setSize(_this.width, _this.height);
    document.getElementById(_this.fId).appendChild(_this.renderer.domElement)
    _this.renderer.setClearColor(_this.option.clearCoolr, 1.0);
    _this.renderer.shadowMap.enabled = true;//
    _this.renderer.shadowMapSoft = true;
    //事件
    console.log(_this)
    console.log(_this.onDocumentMouseDown)
    console.log(_this.onDocumentMouseDown.bind)
    // _this.renderer.domElement.addEventListener('mousedown', _this.onDocumentMouseDown.bind(_this), false);
    _this.renderer.domElement.addEventListener('mousedown', (e) => {
      console.log(e)
      this.onDocumentMouseDown(e)
    }, false);
    _this.renderer.domElement.addEventListener('mousemove', (e) => {
      this.onDocumentMouseMove(e)
    }, false)
  }

  initCamera () {
    var _this = this
    _this.camera = new THREE.PerspectiveCamera(45, _this.width / _this.height, 1, 100000)
    _this.camera.name = 'mainCamera'
    _this.camera.position.x = 0
    _this.camera.position.y = 1000
    _this.camera.position.z = -1800
    _this.camera.up.x = 0
    _this.camera.up.y = 1
    _this.camera.up.z = 0
    _this.camera.lookAt({ x: 0, y: 0, z: 0 })
    _this.objects.push(_this.camera)
  }

  initScene () {
    var _this = this
    //给场景添加天空盒子纹理
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    //六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
    var cubeTexture = cubeTextureLoader.load( [
      front, behind,
      up, down,
      left, right
    ] );
    _this.scene = new THREE.Scene()
    _this.scene.background = cubeTexture;
  }

  addObject (_obj, isg, g) {
    var _this = this
    if (isg && isg == 'group') {
      g.add(_obj)
    } else {
      _this.objects.push(_obj)
      _this.scene.add(_obj)
    }
  }

  initHelpGrid () {
    var _this = this
    if (_this.option.showHelpGrid) {
      var helpGrid = new THREE.GridHelper(1000, 50)
      _this.scene.add(helpGrid)
    }
  }

  initLight () {
    var _this = this
    var light = new THREE.AmbientLight(0xcccccc)
    light.position.set(0, 0, 0)
    _this.scene.add(light)
    var light2 = new THREE.PointLight(0x555555)
    light2.shadow.camera.near = 1
    light2.shadow.camera.far = 5000
    light2.position.set(0, 350, 0)
    light2.castShadow = true
    _this.scene.add(light2)
  }

  initMouseCtrl () {
    var _this = this;
    console.log(_this.camera)
    _this.controls = new OrbitControls(_this.camera, document.getElementById(_this.fId));
    _this.controls.addEventListener('change', (e) => {
      _this.updateControls(e)
    });
  }

  updateControls (e) {
    var _this =  this
    // console.log(e)
  }

  // linkLine () {
  //   var _this = this;
  //   var pX = (_this.p1.x / _this.width) * 2 - 1;
  //   var pY = - (_this.p1.y / _this.height) * 2 + 1;
  //   var p = new THREE.Vector3(pX, pY, -1).unproject(_this.camera)
  //   console.log(new THREE.Vector3(pX, pY, -1).unproject(_this.camera))
  //   console.log(_this.camera)
  //   console.log(p)
  //   var geometry = new THREE.Geometry();
  //   var material = new THREE.LineBasicMaterial( { color: 0xff0000} );
  //   geometry.vertices.push(_this.p1)
  //   _this.p2.x = p.x + 300
  //   _this.p2.y = p.y + 300
  //   _this.p2.z = p.z + 300
  //   geometry.vertices.push(_this.p2)
  //   var line = new THREE.Line( geometry, material, THREE.LineSegments )
  //   line.name = 'xfxian'
  //   _this.scene.add(line)
  // }

  animation () {
    var _this =  this;
    if (createjs.TWEEN != null && typeof (createjs.TWEEN) != 'undefined') {
      createjs.TWEEN.update();
    }
    requestAnimationFrame(() => {
      _this.animation()
    })
    _this.renderer.render(_this.scene, _this.camera);
    if (!isOne) {
      // this.linkLine()
      isOne++
      console.log(isOne)
    }
    // _this.mymove()
  }

  mymove () {
    var _this =  this;
    var xf = [..._this.scene.children].find(function(v){
      return v.name == 'xfxian'
    })
    _this.p1 = _this.p1
    var pX = (400 / _this.width) * 2 - 1;
    var pY = - (200 / _this.height) * 2 + 1;
    var p = new THREE.Vector3(pX, pY, -1)
    var p = new THREE.Vector3(pX, pY, -1).unproject(_this.camera)
    _this.p2.x = p.x
    _this.p2.y = p.y
    _this.p2.z = p.z
    xf.geometry.verticesNeedUpdate=true
  }
  transToScreenCoord(vector) {
    var screenCoord = {};
    vector.project(camera);
    screenCoord.x = (0.5 + vector.x / 2) * window.innerWidth;
    screenCoord.y = (0.5 - vector.y / 2) * window.innerHeight;
    return screenCoord;
  }
  InitAddObject (_obj) {
    var _this = this;
    if (_obj.show == null || typeof (_obj.show) == 'undefined' || _obj.show) {
      var _tempObj = null;
      var _tempObjList = []
      switch (_obj.objType) {
        case 'cube':
          _tempObj = _this.createCube(_this, _obj);
          _this.addObject(_tempObj);
          break;
        case 'floor':
          _tempObj = _this.CreateFloor(_obj)
          _this.addObject(_tempObj);
          break;
        case 'wall':
          _tempObjList = _this.CreateWall(_this,_obj);
          _tempObjList.forEach((v, i) => {
            _this.addObject(v)
          })
          break;
        case 'plane':
          _tempObj = _this.createPlaneGeometry(_this, _obj);
          _this.addObject(_tempObj);
          break;
        case 'glasses':
          _tempObj = _this.createGlasses(_this, _obj);
          _this.addObject(_tempObj);
          break;
        case 'emptyCabinet':
          _tempObj = _this.createEmptyCabinet(_this, _obj);
          _this.addObject(_tempObj);
          break;
        case 'cloneObj':
          _tempObj = _this.commonFunc.cloneObj(_obj.copyfrom, _obj);
          _this.addObject(_tempObj);
          break;
        case 'Cylinder':
          _tempObj = _this.createCylinder(_this, _obj);
            _this.addObject(_tempObj);
          break;
        case 'group':
          _tempObj = _this.addGroup(_this, _obj);
          _this.addObject(_tempObj);
          break;
        case 'gltfObj' :
          _tempObj = _this.addGltfObj(_obj)
          // _this.addObject(_tempObj);
          break;
        case 'addFBXObj' :
          _tempObj = _this.addFBXObj(_obj)
          break;
        case 'initText' :
          _tempObj = _this.initText(_obj);
          break;
      }
    }
  }
  // text
  initText (_obj) {
    var _this =  this
    // var particleMaterial = new THREE.SpriteCanvasMaterial( {
    //   color: 0x000000,
    //   program: function ( context ) {
    //     context.beginPath();
    //     context.font="bold 100px Arial";
    //     context.fillStyle="#058";
    //     context.transform(-1,0,0,1,0,0);
    //     context.rotate(Math.PI);
    //     context.fillText( _obj.wordFont , 0, 0 );
    //   }
    // })
    // var particle = new THREE.Sprite(particleMaterial)
    // particle.rotation.x = Math.PI/2;
    // _this.scene.add(particle)
  }
  //gltf
  addGltfObj (_obj) {
    var _this =  this
    var _x = _obj.x || 0, _y = _obj.y || 0, _z = _obj.z || 0;
    var rx = _obj.rx || 0, ry = _obj.ry || 0, rz = _obj.rz || 0;
    var scale = _obj.scale
    var GLTFload = new GLTFLoader()
    console.log(GLTFload)
    var obj
    GLTFload.setCrossOrigin('Anonymous')
    GLTFload.uuid = _obj.uuid
    GLTFload.load(_obj.url, function (object) {
      console.log('加载成功')
      console.log(object)
      object.scene.children[0].position.x = _x
      object.scene.children[0].position.y = _y
      object.scene.children[0].position.z = _z
      object.scene.children[0].scale.x = scale
      object.scene.children[0].scale.y = scale
      object.scene.children[0].scale.z = scale
      object.scene.children[0].rotation.x = rx
      object.scene.children[0].rotation.y = ry
      object.scene.children[0].rotation.z = rz
      obj = object.scene
      // console.log(obj)
      _this.objects.push(obj)
      _this.scene.add(obj)
    }, () => {
    }, () => {
    })
    // console.log(obj)
    // return obj
  }
  // fbx
  addFBXObj (_obj) {
    var _this =  this
    var _x = _obj.x || 0, _y = _obj.y || 0, _z = _obj.z || 0;
    var rx = _obj.rx || 0, ry = _obj.ry || 0, rz = _obj.rz || 0;
    var scale = _obj.scale
    var FBXloader = new FBXLoader()
    FBXloader.load(_obj.url, function (object) {
      // object.scale.multiplyScalar(.1);    // 缩放模型大小
      // object.repeat.set(1, 1);
      object.scale.multiplyScalar(1);
      _this.scene.add(object)
    })
  }
  //创建地板
  CreateFloor (_obj) {
    var _this = this;
    var _cube = _this.createCube(_this, _obj);
    return _cube;
  }
  addGroup (_this, _obj) {
    var _this = this
    var group = new THREE.Group()
    console.log(_this, _obj)
    _obj.childrens.forEach((v, i) => {
      if (v.show == null || typeof (v.show) == 'undefined' || v.show) {
        var _tempObj = null;
        var _tempObjList = []
        switch (v.objType) {
          case 'cube':
            _tempObj = _this.createCube(_this, v);
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'floor':
            _tempObj = _this.CreateFloor(v)
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'wall':
            // _tempObj = _this.CreateWall(_this,_obj);
            // _this.addObject(_tempObj, 'group', group);
            _tempObjList = _this.CreateWall(_this,v);
            _tempObjList.forEach((v, i) => {
              _this.addObject(v, 'group', group)
            })
            break;
          case 'plane':
            _tempObj = _this.createPlaneGeometry(_this, v);
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'glasses':
            _tempObj = _this.createGlasses(_this, v);
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'emptyCabinet':
            _tempObj = _this.createEmptyCabinet(_this, v);
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'cloneObj':
            _tempObj = _this.commonFunc.cloneObj(v.copyfrom, v);
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'Cylinder' :
            _tempObj = _this.createCylinder(_this, v);
              _this.addObject(_tempObj, 'group', group)
            break;
          case 'group' :
            _tempObj = _this.addGroup(_this, v);
            _this.addObject(_tempObj, 'group', group);
            break;
          case 'gltfObj' :
            _tempObj = _this.addGltfObj(_obj)
            break
        }
      }
    })
    return group
  }
  // 创建圆柱形
  createCylinder (_this, _obj) {
    console.log(_this, _obj)
    var _length = _obj.length || 4;//默认4
    var _width = _obj.width || 2;
    var _height = _obj.height || 2;
    var _x = _obj.x || 0, _y = _obj.y || 0, _z = _obj.z || 0;
    var skinColor = _obj.style.skinColor || 0x98750f;
    var CylinderGeometry = new THREE.CylinderGeometry(_height, _width, _length, 18, 3);
    console.log(CylinderGeometry)
    //六面颜色
    for (var i = 0; i < CylinderGeometry.faces.length; i += 2) {
      var hex = skinColor || Math.random() * 0x531844;
      CylinderGeometry.faces[i].color.setHex(hex);
      CylinderGeometry.faces[i + 1].color.setHex(hex);
    }
    //六面纹理
    var skin_up_obj = {
      vertexColors: THREE.FaceColors
    }
    var skin_down_obj = skin_up_obj,
      skin_fore_obj = skin_up_obj,
      skin_behind_obj = skin_up_obj,
      skin_left_obj = skin_up_obj,
      skin_right_obj = skin_up_obj;
    var skin_opacity = 1;
    if (_obj.style != null && typeof (_obj.style) != 'undefined'
      && _obj.style.skin != null && typeof (_obj.style.skin) != 'undefined') {
      //透明度
      if (_obj.style.skin.opacity != null && typeof (_obj.style.skin.opacity) != 'undefined') {
        skin_opacity = _obj.style.skin.opacity;
        console.log(skin_opacity)
      }
      //上
      skin_up_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_up, CylinderGeometry, 4);
      //下
      skin_down_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_down, CylinderGeometry, 6);
      // //前
      skin_fore_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_fore, CylinderGeometry, 0);
      //后
      skin_behind_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_behind, CylinderGeometry, 2);
      //左
      skin_left_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_left, CylinderGeometry, 8);
      //右
      skin_right_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_right, CylinderGeometry, 10);
    }
    var CylinderMaterialArray = [];
    CylinderMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
    CylinderMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));
    CylinderMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
    CylinderMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
    CylinderMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
    CylinderMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
    var CylinderMaterials = new THREE.MeshFaceMaterial(CylinderMaterialArray);
    var Cylinder = new THREE.Mesh(CylinderGeometry, CylinderMaterials);
    Cylinder.castShadow = true;
    Cylinder.receiveShadow = true;
    Cylinder.uuid = _obj.uuid;
    Cylinder.name = _obj.name;
    Cylinder.position.set(_x, _y, _z);
    if (_obj.rotation != null && typeof (_obj.rotation) != 'undefined' && _obj.rotation.length > 0) {
      _obj.rotation.forEach(function (v, i) {
        switch (v.direction) {
          case 'x':
            Cylinder.rotateX(v.degree);
            break;
          case 'y':
            Cylinder.rotateY(v.degree);
            break;
          case 'z':
            Cylinder.rotateZ(v.degree);
            break;
          case 'arb':
            Cylinder.rotateOnAxis(new THREE.Vector3(v.degree[0], v.degree[1], v.degree[2]), v.degree[3]);
            break;
        }
      })
    }
    return Cylinder;
  }
//创建墙体
  CreateWall (_this, _obj) {
    if (_this == null) {
      _this = this;
    }
    var cubeList = []
    var _commonThick = _obj.thick || 40;//墙体厚度
    var _commonLength = _obj.length || 100;//墙体厚度
    var _commonHeight = _obj.height || 300;//强体高度
    var _commonSkin = _obj.style.skinColor || 0x98750f;
    //建立墙面
    _obj.wallData.forEach(function (v, i) {
      var wallLength = _commonLength;
      var wallWidth = v.thick||_commonThick;
      var positionX = ((v.startDot.x||0) + (v.endDot.x||0)) / 2;
      var positionY = ((v.startDot.y || 0) + (v.endDot.y || 0)) / 2;
      var positionZ = ((v.startDot.z || 0) + (v.endDot.z || 0)) / 2;
      //z相同 表示x方向为长度
      if (v.startDot.z == v.endDot.z) {
        wallLength = Math.abs(v.startDot.x - v.endDot.x);
        wallWidth = v.thick || _commonThick;
      } else if (v.startDot.x == v.endDot.x) {
        wallLength = v.thick || _commonThick;
        wallWidth = Math.abs(v.startDot.z - v.endDot.z);
      }
      var cubeobj = {
        length: wallLength,
        width: wallWidth,
        height: v.height || _commonHeight,
        rotation: v.rotation,
        x: positionX,
        y: positionY,
        z: positionZ,
        uuid: v.uuid,
        name:v.name,
        style: {
          skinColor: _commonSkin,
          skin:v.skin
        }
      }
      var _cube = _this.createCube(_this, cubeobj);
      if (_this.commonFunc.hasObj(v.childrens) && v.childrens.length > 0) {
        v.childrens.forEach(function (v1, i1) {
          var _newobj = null;
          _newobj = _this.CreateHole(_this, v1);
          _cube = _this.mergeModel(_this, v1.op, _cube, _newobj);
        })
      }
      cubeList.push(_cube)
      // return _cube
      // _this.addObject(_cube);
    })
    return cubeList
  }
//挖洞
  CreateHole (_this, _obj) {
    if (_this == null) {
      _this = this;
    }
    var _commonThick =  40;// 墙体厚度
    var _commonLength =  100;// 墙体厚度
    var _commonHeight =  300;// 强体高度
    var _commonSkin = 0x98750f;
    //建立墙面
    var wallLength = _commonLength;
    var wallWidth = _obj.thick || _commonThick;
    var positionX = ((_obj.startDot.x || 0) + (_obj.endDot.x || 0)) / 2;
    var positionY = ((_obj.startDot.y || 0) + (_obj.endDot.y || 0)) / 2;
    var positionZ = ((_obj.startDot.z || 0) + (_obj.endDot.z || 0)) / 2;
    //z相同 表示x方向为长度
    if (_obj.startDot.z == _obj.endDot.z) {
      wallLength = Math.abs(_obj.startDot.x - _obj.endDot.x);
      wallWidth = _obj.thick || _commonThick;
    } else if (_obj.startDot.x == _obj.endDot.x) {
      wallLength = _obj.thick || _commonThick;
      wallWidth = Math.abs(_obj.startDot.z - _obj.endDot.z);
    }
    var cubeobj = {
      length: wallLength,
      width: wallWidth,
      height: _obj.height || _commonHeight,
      rotation: _obj.rotation,
      x: positionX,
      uuid: _obj.uuid,
      name: _obj.name,
      y: positionY,
      z: positionZ,
      style: {
        skinColor: _commonSkin,
        skin: _obj.skin
      }
    }
    var _cube = _this.createCube(_this, cubeobj);
    return _cube;
  }
//模型合并 使用ThreeBSP插件mergeOP计算方式 -表示减去 +表示加上
  mergeModel (_this, mergeOP, _fobj, _sobj) {
    if (_this == null) {
      _this = this;
    }
    var fobjBSP = new ThreeBSP(_fobj);
    var sobjBSP = new ThreeBSP(_sobj);
    // var sobjBSP = new ThreeBSP(_sobj);
    var resultBSP = null;
    if (mergeOP == '-') {
      resultBSP = fobjBSP.subtract(sobjBSP);
    } else if (mergeOP == '+') {
      var subMesh = new THREE.Mesh(_sobj);
      _sobj.updateMatrix();
      _fobj.geometry.merge(_sobj.geometry, _sobj.matrix);
      return _fobj;
      // resultBSP = fobjBSP.union(sobjBSP);
    } else if (mergeOP == '&') {//交集
      resultBSP = fobjBSP.intersect(sobjBSP);
    } else {
      _this.addObject(_sobj);
      return _fobj;
    }
    var cubeMaterialArray = [];
    for (var i = 0; i < 1; i++) {
      cubeMaterialArray.push(new THREE.MeshLambertMaterial({
        //map: _this.createSkin(128, 128, { imgurl: '../datacenterdemo/res2/'+(i%11)+'.jpg' }),
        vertexColors: THREE.FaceColors
      }));
    }
    var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
    var result = resultBSP.toMesh(cubeMaterials);
    result.material.shading = THREE.FlatShading;
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    result.uuid= _fobj.uuid+mergeOP+_sobj.uuid;
    result.name=_fobj.name+mergeOP+_sobj.name;
    result.material.needsUpdate = true;
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;
    var _foreFaceSkin = null;
    for (var i = 0; i < result.geometry.faces.length; i++) {
      var _faceset = false;
      for (var j = 0; j < _fobj.geometry.faces.length; j++) {
        if (result.geometry.faces[i].vertexNormals[0].x === _fobj.geometry.faces[j].vertexNormals[0].x
          && result.geometry.faces[i].vertexNormals[0].y === _fobj.geometry.faces[j].vertexNormals[0].y
          && result.geometry.faces[i].vertexNormals[0].z === _fobj.geometry.faces[j].vertexNormals[0].z
          && result.geometry.faces[i].vertexNormals[1].x === _fobj.geometry.faces[j].vertexNormals[1].x
          && result.geometry.faces[i].vertexNormals[1].y === _fobj.geometry.faces[j].vertexNormals[1].y
          && result.geometry.faces[i].vertexNormals[1].z === _fobj.geometry.faces[j].vertexNormals[1].z
          && result.geometry.faces[i].vertexNormals[2].x === _fobj.geometry.faces[j].vertexNormals[2].x
          && result.geometry.faces[i].vertexNormals[2].y === _fobj.geometry.faces[j].vertexNormals[2].y
          && result.geometry.faces[i].vertexNormals[2].z === _fobj.geometry.faces[j].vertexNormals[2].z) {
          result.geometry.faces[i].color.setHex(_fobj.geometry.faces[j].color.r * 0xff0000 + _fobj.geometry.faces[j].color.g * 0x00ff00 + _fobj.geometry.faces[j].color.b * 0x0000ff);
          _foreFaceSkin = _fobj.geometry.faces[j].color.r * 0xff0000 + _fobj.geometry.faces[j].color.g * 0x00ff00 + _fobj.geometry.faces[j].color.b * 0x0000ff;
          _faceset =true;
        }
      }
      if (_faceset == false){
        for(var j = 0; j < _sobj.geometry.faces.length; j++) {
          if (result.geometry.faces[i].vertexNormals[0].x === _sobj.geometry.faces[j].vertexNormals[0].x
            && result.geometry.faces[i].vertexNormals[0].y === _sobj.geometry.faces[j].vertexNormals[0].y
            && result.geometry.faces[i].vertexNormals[0].z === _sobj.geometry.faces[j].vertexNormals[0].z
            && result.geometry.faces[i].vertexNormals[1].x === _sobj.geometry.faces[j].vertexNormals[1].x
            && result.geometry.faces[i].vertexNormals[1].y === _sobj.geometry.faces[j].vertexNormals[1].y
            && result.geometry.faces[i].vertexNormals[1].z === _sobj.geometry.faces[j].vertexNormals[1].z
            && result.geometry.faces[i].vertexNormals[2].x === _sobj.geometry.faces[j].vertexNormals[2].x
            && result.geometry.faces[i].vertexNormals[2].y === _sobj.geometry.faces[j].vertexNormals[2].y
            && result.geometry.faces[i].vertexNormals[2].z === _sobj.geometry.faces[j].vertexNormals[2].z
            && result.geometry.faces[i].vertexNormals[2].z === _sobj.geometry.faces[j].vertexNormals[2].z) {
            result.geometry.faces[i].color.setHex(_sobj.geometry.faces[j].color.r * 0xff0000 + _sobj.geometry.faces[j].color.g * 0x00ff00 + _sobj.geometry.faces[j].color.b * 0x0000ff);
            _foreFaceSkin = _sobj.geometry.faces[j].color.r * 0xff0000 + _sobj.geometry.faces[j].color.g * 0x00ff00 + _sobj.geometry.faces[j].color.b * 0x0000ff;
            _faceset = true;
          }
        }
      }
      if (_faceset == false) {
        result.geometry.faces[i].color.setHex(_foreFaceSkin);
      }
      // result.geometry.faces[i].materialIndex = i
    }
    result.castShadow = true;
    result.receiveShadow = true;
    return result;
  }
//创建盒子体
  createCube (_this, _obj) {
    // console.log(_this, _obj)
    if (_this == null) {
      _this = this;
    }
    var _length = _obj.length || 1000;//默认1000
    var _width = _obj.width || _length;
    var _height = _obj.height || 10;
    var _x = _obj.x || 0, _y = _obj.y || 0, _z = _obj.z || 0;
    var skinColor = _obj.style.skinColor || 0x98750f;
    var cubeGeometry = new THREE.CubeGeometry(_length, _height, _width, 0, 0, 1);
    // console.log(cubeGeometry)
    //六面颜色
    for (var i = 0; i < cubeGeometry.faces.length; i += 2) {
      var hex = skinColor || Math.random() * 0x531844;
      cubeGeometry.faces[i].color.setHex(hex);
      cubeGeometry.faces[i + 1].color.setHex(hex);
    }
    //六面纹理
    var skin_up_obj = {
      vertexColors: THREE.FaceColors
    }
    var skin_down_obj = skin_up_obj,
      skin_fore_obj = skin_up_obj,
      skin_behind_obj = skin_up_obj,
      skin_left_obj = skin_up_obj,
      skin_right_obj = skin_up_obj;
    var skin_opacity = 1;
    if (_obj.style != null && typeof (_obj.style) != 'undefined'
      && _obj.style.skin != null && typeof (_obj.style.skin) != 'undefined') {
      //透明度
      if (_obj.style.skin.opacity != null && typeof (_obj.style.skin.opacity) != 'undefined') {
        skin_opacity = _obj.style.skin.opacity;
        // console.log(skin_opacity)
      }
      //上
      skin_up_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_up, cubeGeometry, 4);
      //下
      skin_down_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_down, cubeGeometry, 6);
      //前
      skin_fore_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_fore, cubeGeometry, 0);
      //后
      skin_behind_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_behind, cubeGeometry, 2);
      //左
      skin_left_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_left, cubeGeometry, 8);
      //右
      skin_right_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_right, cubeGeometry, 10);
    }
    var cubeMaterialArray = [];
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
    var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.uuid = _obj.uuid;
    cube.name = _obj.name;
    cube.position.set(_x, _y, _z);
    if (_obj.rotation != null && typeof (_obj.rotation) != 'undefined' && _obj.rotation.length > 0) {
      _obj.rotation.forEach(function (v, i) {
        switch (v.direction) {
          case 'x':
            cube.rotateX(v.degree);
            break;
          case 'y':
            cube.rotateY(v.degree);
            break;
          case 'z':
            cube.rotateZ(v.degree);
            break;
          case 'arb':
            cube.rotateOnAxis(new THREE.Vector3(v.degree[0], v.degree[1], v.degree[2]), v.degree[3]);
            break;
        }
      })
    }
    return cube;
  }
//创建二维平面-长方形
  createPlaneGeometry (_this,_obj) {
    //options={
    //    width:0,
    //    height:0,
    //    pic:"",
    //    transparent:true,
    //    opacity:1
    //    blending:false,
    //position: { x:,y:,z:},
    //rotation: { x:,y:,z:},
    //}

    var  options = _obj;
    if (typeof options.pic == "string") {//传入的材质是图片路径，使用 textureloader加载图片作为材质
      var loader = new THREE.TextureLoader();
      loader.setCrossOrigin(this.crossOrigin);
      var texture = loader.load(options.pic, function () { }, undefined, function () { });
    } else {
      var texture = new THREE.CanvasTexture(options.pic)
    }
    var MaterParam = {//材质的参数
      map: texture,
      overdraw: true,
      side: THREE.FrontSide,
      //              blending: THREE.AdditiveBlending,
      transparent: options.transparent,
      //needsUpdate:true,
      //premultipliedAlpha: true,
      opacity: options.opacity
    }
    if (options.blending) {
      MaterParam.blending = THREE.AdditiveBlending//使用饱和度叠加渲染
    }
    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(options.width, options.height, 1, 1),
      new THREE.MeshBasicMaterial(MaterParam)
    );
    plane.position.x = options.position.x;
    plane.position.y = options.position.y;
    plane.position.z = options.position.z;
    plane.rotation.x = options.rotation.x;
    plane.rotation.y = options.rotation.y;
    plane.rotation.z = options.rotation.z;
    return plane;
  }
//创建空柜子
  createEmptyCabinet (_this, _obj) {
    /* 参数demo
    {
    show:true,
    name: 'test',
    uuid: 'test',
   rotation: [{ direction: 'y', degree: 0.25*Math.PI}],//旋转     uuid:'',
    objType: 'emptyCabinet',
    transparent:true,
    size:{length:50,width:60,height:200, thick:2},
    position: { x: -220, y: 105, z: -150 },
    doors: {
        doorType:'lr',// ud门 lr左右门
        doorSize:[1],
        skins:[ {
            skinColor: 0x333333,
            skin_fore: {
                imgurl: "../datacenterdemo/res/rack_door_back.jpg",
            },
            skin_behind: {
                imgurl: "../datacenterdemo/res/rack_front_door.jpg",
            }
        }]
    },
    skin:{
            skinColor: 0xdddddd,

                skin:{
                            skinColor: 0xdddddd,
                            skin_up: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_down: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_fore: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_behind: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_left: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_right: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                }

        }
  }
    */
    var _this =  this;
    //创建五个面
    //上
    var upobj= {
      show: true,
      uuid: "",
      name: '',
      objType: 'cube',
      length: _obj.size.length+1,
      width: _obj.size.width ,
      height: _obj.size.thick + 1,
      x: _obj.position.x+1,
      y: _obj.position.y+(_obj.size.height/2-_obj.size.thick/2),
      z:_obj.position.z,
      style: {
        skinColor: _obj.skin.skinColor,
        skin: _obj.skin.skin_up.skin
      }
    }
    var upcube = _this.createCube(_this, upobj);
    //左
    var leftobj = {
      show: true,
      uuid: "",
      name: '',
      objType: 'cube',
      length: _obj.size.length,
      width: _obj.size.thick,
      height: _obj.size.height,
      x: 0,
      y: -(_obj.size.height / 2 - _obj.size.thick / 2),
      z: 0 - (_obj.size.width / 2 - _obj.size.thick / 2) - 1,
      style: {
        skinColor: _obj.skin.skinColor,
        skin: _obj.skin.skin_left.skin
      }
    }
    var leftcube = _this.createCube(_this, leftobj);
    var Cabinet = _this.mergeModel(_this, '+', upcube, leftcube);
    //右
    var Rightobj = {
      show: true,
      uuid: "",
      name: '',
      objType: 'cube',
      length: _obj.size.length,
      width: _obj.size.thick,
      height: _obj.size.height,
      x: 0,
      y: -(_obj.size.height / 2 - _obj.size.thick / 2),
      z: (_obj.size.width / 2 - _obj.size.thick / 2)+1,
      style: {
        skinColor: _obj.skin.skinColor,
        skin: _obj.skin.skin_right.skin
      }
    }
    var Rightcube = _this.createCube(_this, Rightobj);
    Cabinet = _this.mergeModel(_this, '+', Cabinet, Rightcube);
    //后
    var Behidobj = {
      show: true,
      uuid: "",
      name: '',
      objType: 'cube',
      length: _obj.size.thick,
      width: _obj.size.width,
      height: _obj.size.height,
      x: (_obj.size.length / 2 - _obj.size.thick / 2)+1,
      y: -(_obj.size.height / 2 - _obj.size.thick / 2),
      z:0,
      style: {
        skinColor: _obj.skin.skinColor,
        skin: _obj.skin.skin_behind.skin
      }
    }
    var Behindcube = _this.createCube(_this, Behidobj);
    Cabinet = _this.mergeModel(_this, '+', Cabinet, Behindcube);
    //下
    var Downobj = {
      show: true,
      uuid: "",
      name: '',
      objType: 'cube',
      length: _obj.size.length+1,
      width: _obj.size.width,
      height: _obj.size.thick,
      x:-1,
      y: -(_obj.size.height- _obj.size.thick)-1,
      z: 0,
      style: {
        skinColor: _obj.skin.skinColor,
        skin: _obj.skin.skin_down.skin
      }
    }
    var Downcube = _this.createCube(_this, Downobj);
    Cabinet = _this.mergeModel(_this, '+', Cabinet, Downcube);

    var tempobj = new THREE.Object3D();
    tempobj.add(Cabinet);
    tempobj.name = _obj.name;
    tempobj.uuid = _obj.uuid;
    Cabinet.name = _obj.shellname,
      _this.objects.push(Cabinet);
    tempobj.position.set({...Cabinet.position});
    //门
    if (_obj.doors != null && typeof (_obj.doors) != 'undefined') {
      var doors = _obj.doors;
      if (doors.skins.length == 1) {//单门
        var singledoorobj = {
          show: true,
          uuid:"",
          name: _obj.doors.doorname[0],
          objType: 'cube',
          length: _obj.size.thick,
          width: _obj.size.width,
          height: _obj.size.height,
          x: _obj.position.x - _obj.size.length / 2 - _obj.size.thick / 2,
          y: _obj.position.y,
          z: _obj.position.z,
          style: {
            skinColor: _obj.doors.skins[0].skinColor,
            skin: _obj.doors.skins[0]
          }
        }
        var singledoorcube = _this.createCube(_this, singledoorobj);
        _this.objects.push(singledoorcube);
        tempobj.add(singledoorcube);
      } else if (doors.skins.length > 1) {//多门


      }

    }

    if (_obj.rotation != null && typeof (_obj.rotation) != 'undefined' && _obj.rotation.length > 0) {
      _obj.rotation.forEach(function (v, i) {
        switch (v.direction) {
          case 'x':
            tempobj.rotateX(v.degree);
            break;
          case 'y':
            tempobj.rotateY(v.degree);
            break;
          case 'z':
            tempobj.rotateZ(v.degree);
            break;
          case 'arb':
            tempobj.rotateOnAxis(new THREE.Vector3(v.degree[0], v.degree[1], v.degree[2]), v.degree[3]);
            break;
        }
      })
    }
    return tempobj;
  }
//创建玻璃
  createGlasses (_this, _obj) {
    var _this =  this;
    var tmpobj = _this.createPlaneGeometry(_this, _obj);
    _this.addObject(tmpobj);
    _obj.rotation.y = Math.PI + _obj.rotation.y;
    var tmpobj2 = _this.createPlaneGeometry(_this, _obj);
    // _this.addObject(tmpobj2);
    return tmpobj2
  }
//创建皮肤
  createSkin (flength,fwidth,_obj) {
    var imgwidth = 128,imgheight=128;
    if (_obj.width != null&& typeof (_obj.width) != 'undefined') {
      imgwidth = _obj.width;
    }
    if (_obj.height != null && typeof (_obj.height) != 'undefined') {
      imgheight = _obj.height;
    }
    // console.log(new THREE.TextureLoader)
    // console.log(_obj.imgurl)
    var texture = new THREE.TextureLoader().load(_obj.imgurl, function (e) {
      // console.log(e)
    }, function (e) {
      // console.log(e)
    });
    var _repeat = false;
    if (_obj.repeatx != null && typeof (_obj.repeatx) != 'undefined' && _obj.repeatx==true) {
      texture.wrapS = THREE.RepeatWrapping;
      _repeat = true;
    }
    if (_obj.repeaty != null && typeof (_obj.repeaty) != 'undefined' && _obj.repeaty == true) {
      texture.wrapT = THREE.RepeatWrapping;
      _repeat = true;
    }
    if (_repeat) {
      texture.repeat.set(flength / imgheight, fwidth / imgheight);
    }
    return texture;
  }
//创建皮肤参数对象
  createSkinOptionOnj (_this, flength, fwidth, _obj, _cube, _cubefacenub) {
    if (_this.commonFunc.hasObj(_obj)) {
      if (_this.commonFunc.hasObj(_obj.imgurl)) {
        return {
          map: _this.createSkin(flength, fwidth, _obj),transparent:true
        }
      } else {
        if (_this.commonFunc.hasObj(_obj.skinColor)) {
          _cube.faces[_cubefacenub].color.setHex(_obj.skinColor);
          _cube.faces[_cubefacenub + 1].color.setHex(_obj.skinColor);
        }
        return {
          vertexColors: THREE.FaceColors
        }
      }
    } else {
      return {
        vertexColors: THREE.FaceColors
      }
    }
  }
//通用方法
  commonFunc={
    //判断对象
    hasObj: function (_obj) {
      if (_obj != null && typeof (_obj) != 'undefined') {
        return true;
      }else{
        return false;
      }
    },
    //查找对象
    findObject: function (_objname) {
      var _this =  this;
      var findedobj = null;
      try {
        _this.objects.forEach(function (v, i) {
          if (v.name != null && v.name != '') {
            if (v.name == _objname) {
              findedobj = v;
              throw new Error('')
            }
          }
        })
      } catch (e) {
      }
      return findedobj;
    },
    //复制对象
    cloneObj: function (_objname, newparam) {
      /*newparam
      {
      show: true,
      uuid:
      copyfrom: 'cabinet1_1',
      name:
      childrenname:[]
      objType: 'cloneObj',
      position:{x:y:z:}//相对复制品的
      scale:{x:1,y:1,z:1}
       rotation: [{ direction: 'y', degree: 0.25*Math.PI}],//旋转     uuid:'',
      }
      */
      var _this =  this;
      var fobj = _this.commonFunc.findObject(_objname);
      var newobj = newobj = fobj.clone();
      if (newobj.children != null && newobj.children.length > 1) {
        newobj.children.forEach(function (v, i) {
          v.name = newparam.childrenname[i];
          _this.objects.push(v);
        })
      }
      //位置
      if (_this.commonFunc.hasObj(newparam.position)) {
        newobj.position.x = newparam.position.x;
        newobj.position.y = newparam.position.y;
        newobj.position.z = newparam.position.z;
      }
      //大小
      if (_this.commonFunc.hasObj(newparam.scale)) {
        newobj.scale.x = newparam.scale.x;
        newobj.scale.y = newparam.scale.y;
        newobj.scale.z = newparam.scale.z;
      }
      //角度
      if (_this.commonFunc.hasObj(newparam.rotation)) {
        newparam.rotation.forEach(function (v, i) {
          switch (v.direction) {
            case 'x':
              newobj.rotateX(v.degree);
              break;
            case 'y':
              newobj.rotateY(v.degree);
              break;
            case 'z':
              newobj.rotateZ(v.degree);
              break;
            case 'arb':
              newobj.rotateOnAxis(new THREE.Vector3(v.degree[0], v.degree[1], v.degree[2]), v.degree[3]);
              break;
          }
        })
      }
      newobj.name = newparam.name;
      newobj.uuid = newparam.uuid;
      return newobj;
    },
    //设置表皮颜色
    setSkinColor: function (_objname, _color) {
      var _this =  this;
      var _obj = _this.commonFunc.findObject(_objname);
      if (_this.commonFunc.hasObj(_obj.material.emissive)) {
        _obj.material.emissive.setHex(_color);
      } else if (_this.commonFunc.hasObj(_obj.material.materials)) {
        if (_obj.material.materials.length > 0) {
          _obj.material.materials.forEach(function (v, i) {
            v.emissive.setHex(_color);
          })
        }
      }
    },
    //添加图片标识
    addIdentification: function (_objname, _obj) {
      var _this =  this;
      var _fobj = _this.commonFunc.findObject(_objname);
      var loader = new THREE.TextureLoader();
      var texture = loader.load(_obj.imgurl, function () { }, undefined, function () { });
      var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.name = _obj.name;
      sprite.position.x = _fobj.position.x + _obj.position.x;
      sprite.position.y = _fobj.position.y + _obj.position.y;
      sprite.position.z = _fobj.position.z + _obj.position.z;
      if (_this.commonFunc.hasObj(_obj.size)) {
        sprite.scale.set(_obj.size.x, _obj.size.y);
      } else {
        sprite.scale.set(1,1);
      }
      _this.addObject(sprite);
    },
    //添加文字
    makeTextSprite: function (_objname, parameters)
    {
      var _this =  this;
      var _fobj = _this.commonFunc.findObject(_objname);
      if ( parameters === undefined ) parameters = {};
      var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
      var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
      var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
      var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };
      var message = parameters.hasOwnProperty("message") ? parameters["message"] : "helloMsj3D";
      var x = parameters.hasOwnProperty("position") ? parameters["position"].x : 0;
      var y = parameters.hasOwnProperty("position") ? parameters["position"].y : 0;
      var z = parameters.hasOwnProperty("position") ? parameters["position"].z : 0;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.font = "Bold " + fontsize + "px " + fontface;
      var metrics = context.measureText( message );
      var textWidth = metrics.width;
      context.lineWidth = borderThickness;
      context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
      context.fillText(message, borderThickness, fontsize + borderThickness);
      var texture = new THREE.Texture(canvas)
      texture.needsUpdate = true;
      var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.x =_fobj.position.x + x;
      sprite.position.y = _fobj.position.y + y;
      sprite.position.z = _fobj.position.z + z;
      sprite.name = parameters.name;
      sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
      _this.addObject(sprite);
    }
  }
  loadObj (_obj) {
    var jsloader = new THREE.JSONLoader();
    jsloader.load("test.json",
      function (geometry, materials) {
        var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
        model.name = 'test';
        model.scale.x = 10;
        model.scale.y = 7;
        model.scale.z = 10;
        model.position.x = -300;
        model.position.y = 50;
        model.position.z = 300;
        _this.addObject(model);
      });
  }

//添加按钮
  addBtns (_btnobjs) {
    var _this =  this;
    if (_btnobjs != null && _btnobjs.length > 0) {
      var d = document.getElementById(_this.fId),
        t = strToDom('<div id="toolbar" class="toolbar" ></div>')[0],
        n = document.createElement("div");
      d.insertBefore(t,d.childNodes[0])
      _btnobjs.forEach(function (v, i) {
        document.getElementById('toolbar').appendChild(strToDom('<img src="' + v.btnimg + '" title="' + v.btnTitle + '" id="' + v.btnid + '" />')[0])
        document.getElementById(v.btnid).onclick = v.event
      })
    }
  }

  /*
  *事件部分
  */

//鼠标按下事件
  onDocumentMouseDown (event) {
    dbclick++;
    var _this =  this;
    setTimeout(function () { dbclick =0}, 500);
    event.preventDefault();
    if (dbclick >= 2) {
      console.log(this)
      _this.raycaster.setFromCamera(_this.mouseClick, _this.camera);
      // console.log(event.clientX)
      // console.log(event.clientY)
      // console.log(_this.width)
      // console.log(_this.height)
      _this.mouseClick.x = (event.clientX / _this.width) * 2 - 1;
      _this.mouseClick.y = -(event.clientY / _this.height) * 2 + 1;
      var clickPosition = {
        x: event.clientX,
        y: event.clientY
      }
      _this.raycaster.setFromCamera(_this.mouseClick, _this.camera);
      var intersects = _this.raycaster.intersectObjects(_this.objects, true);
      if (intersects.length > 0) {
          // this.findGroup(intersects[0].object)
          _this.controls.enabled = false;
          _this.SELECTED = intersects[0].object;
          // console.log(intersects[0].object + 'ddddd')
          if (_this.eventList != null && _this.eventList.dbclick != null && _this.eventList.dbclick.length > 0) {
            _this.eventList.dbclick.forEach(function (v, i) {
              if ("string" == typeof (v.obj_name)) {
                if (v.obj_name == _this.SELECTED.name) {
                  v.obj_event(_this.SELECTED, _this);
                }
              } else if (v.findObject!=null||'function' == typeof (v.findObject)) {
                if (v.findObject(_this.SELECTED.name)) {
                  v.obj_event(_this.SELECTED, _this);
                }
              }
            })
          }
          _this.controls.enabled = true;
      }
    }
  }
  findGroup (obj) {
    console.log(obj.parent)
    if  (obj.parent.type === 'Group')  {
      return obj.parent
    } else{
      return this.findGroup(obj.parent)
    }
  }


  onDocumentMouseMove (event) {
    event.preventDefault();
    var _this =  this;
    _this.mouseClick.x = (event.clientX / _this.width) * 2 - 1;
    _this.mouseClick.y = -(event.clientY / _this.height) * 2 + 1;
    _this.raycaster.setFromCamera(_this.mouseClick, _this.camera);
    var intersects = _this.raycaster.intersectObjects(_this.objects);
    if (intersects.length > 0) {
      _this.controls.enabled = false;
      _this.SELECTED = intersects[0].object;
      if (_this.eventList != null && _this.eventList.mouseMove != null && _this.eventList.mouseMove.length > 0) {
        _this.eventList.mouseMove.forEach(function (v, i) {
          if ("string" == typeof (v.obj_name)) {
            if (v.obj_name == _this.SELECTED.name) {
              v.obj_event(_this.SELECTED);
            }
          } else if (v.findObject!=null||'function' == typeof (v.findObject)) {
            if (v.findObject(_this.SELECTED.name)) {
              v.obj_event(_this.SELECTED);
            }
          }
        })
      }
      _this.controls.enabled = true;
    }
  }



  // addTestObj () {
  //
  //   var _this =  this;
  //
  //   var jsloader = new THREE.JSONLoader();
  //   jsloader.load("test.json",
  //     function (geometry, materials) {
  //       var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
  //       model.name = 'test';
  //       model.scale.x = 10;
  //       model.scale.y = 7;
  //       model.scale.z = 10;
  //       model.position.x = -300;
  //       model.position.y = 50;
  //       model.position.z = 300;
  //       _this.addObject(model);
  //     });
  //   var plane =
  //     _this.createPlaneGeometry(_this, {
  //       width: 100,
  //       height: 200,
  //       pic: "../datacenterdemo/res/glass.png",
  //       transparent: true,
  //       opacity: 1,
  //       position: { x: 0, y: 100, z: -200 },
  //       rotation: { x: 0, y: 0*Math.PI, z: 0 },
  //       blending: false
  //     });
  // }
}




