'use client'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';
import * as dat from 'dat.gui';

/**
 * Threejs 学习
 * https://threejs.org/docs/#manual/zh/introduction/Installation
 * https://juejin.cn/post/7373921342096687119
 * https://juejin.cn/post/7237697495109926972
 * https://juejin.cn/post/7055296508870000670
 */
export default function Page() {

const gui = new dat.GUI();
// 创建场景
const sence =  new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
// 设置相机位置
camera.position.set(0,0,10)
// 将相机添加到场景中
sence.add(camera);

// 创建几何体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// 创建物体材质
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// 几何体和材质组成一个物体
const cube = new THREE.Mesh( geometry, material );
// 将物体添加到场景
sence.add(cube)


// 初始化一个渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染器尺寸
renderer.setSize(window.innerWidth,window.innerHeight)
// 将webGL渲染的canvas内容添加到body(将渲染器添加到body)
document.body.appendChild(renderer.domElement)
// 使用渲染器将场景通过相机渲染出来
renderer.render(sence,camera)


// 创建控制器
const controls = new OrbitControls( camera, renderer.domElement );

// 设置轨道控制器的阻尼
controls.enableDamping = true;

// 创建一个补间动画
const tween = gsap.to(cube.position,{
    // 移动距离
    x:5,
    // 时间
    duration: 3,
    // 重复运动
    repeat: -1,
    // 往返运动
    yoyo:true,
    // 速率曲线
    ease: "power2.out",
    // 动画开始回调
    onStart:() => {
        console.log('动画开始了！')
    },
    // 动画完成回调
    onComplete:() => {
        console.log('动画完成')
    }
})


// 创建渲染函数
// 速度：
let speed = 1;
// 初始化一个时钟
const clock = new THREE.Clock();
function render(time) {   
    controls.update()
    // // 获取每两帧之间的时间间隔
    // const clockTime = clock.getElapsedTime() 
    // // 移动时间
    // let t = clockTime  % 5;
    // // 时间 * 速度
    // cube.position.x = t * speed;
    renderer.render(sence,camera)
    requestAnimationFrame(render)
}


// 创建辅助坐标系
const axesHelper = new THREE.AxesHelper( 5 );
// 添加到场景
sence.add( axesHelper );

window.addEventListener('resize',() => {
    // 更新相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 修改相机矩阵(就是摄像机的视野以及渲染画面的范围)
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

window.addEventListener('dblclick',() => {
    // tween是补间动画 isActive是补间动画的方法
    if(tween.isActive()) {
        // 暂停
        tween.pause()
    } else {
        // 继续
        tween.resume()
    }
})

//向图形化界面添加一个移动属性
gui.add(cube.position,"x")
//移动最小值
.min(0)
//移动的最大值
.max(5)
//名称
.name('移动X轴')
//移动步长
.step(0.1)
.onChange((val)=>{
    // console.log(val);
}).onFinishChange((val)=>{

});
//修改颜色
const params = {
    color:'#ffff00',
}
//将选取的颜色，复制到材料上
gui.addColor(params,"color").onChange((value)=>{
    cube.material.color.set(value);
});
//添加是否显示到图形化界面
gui.add(cube,'visible').name('是否显示');

//图形化界面添加一个文件夹
const folder = gui.addFolder('设置立方体');
folder.add(cube.material,'wireframe');
// 初始化时执行下渲染函数


    return (<div>
        sui by move
        {render(1)}
    </div>)
}