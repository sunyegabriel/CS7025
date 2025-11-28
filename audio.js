document.addEventListener("DOMContentLoaded", function () {
    // 1. 准备音效
    const clickSound = new Audio("./JS_Audio/mixkit-modern-technology-select-3124.wav");

    // 2. 选中 nav 里面的所有 <a>（Home / About / Contact）
    const navLinks = document.querySelectorAll("div a");

    // 3. 给每一个链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            // 如果你只是做练习，不想真的跳转页面，可以先阻止默认行为：
            // event.preventDefault();

            // 4. 每次点击都从头播放
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
});
