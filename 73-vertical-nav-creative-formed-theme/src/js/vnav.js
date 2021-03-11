

function checkLeftSideBarMg(){

    const headerBanner = document.getElementById("banner");
    const leftSidebar = document.getElementById("left-sidebar");
    const vnavHam = document.getElementById("vnav-ham");

	const headerBannerHeight = headerBanner.offsetHeight;
    const vnavHamHeight = vnavHam.offsetHeight;

    if (vnavHamHeight <= 1) {
        leftSidebar.style.setProperty('padding-top' ,`${headerBannerHeight}px`);
        leftSidebar.style.setProperty('z-index' ,`9`);
    } else {
        leftSidebar.style.setProperty('padding-top' ,`${vnavHamHeight}px`);
        leftSidebar.style.setProperty('z-index' ,`101`); 
        
    }
}

checkLeftSideBarMg();
window.addEventListener('resize', function(event){
    checkLeftSideBarMg();
});