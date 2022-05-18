// console.log('java linked')

const packages = [
  {heavy: true, priority: false, fragile: false, to: 'Harrington', trackingNumber: '1324kjs', lost: false, clicked: false},
  {heavy: false, priority: true, fragile: true, to: 'Mark', trackingNumber: '1325sdk', lost: false, clicked: false},
  {heavy: true, priority: false, fragile: true, to: 'Mick', trackingNumber: 'jffd147', lost: false, clicked: false}, 
  {heavy: false, priority: false, fragile: false, to: 'Jake', trackingNumber: 'acdc145', lost: false, clicked: false}, 
  {heavy: true, priority: true, fragile: true, to: 'Brittany', lost: false, clicked: false}, 
  {heavy: false, priority: true, fragile: false, to: 'Zach', trackingNumber: '8081baz', lost: false, clicked: false}, 
  {heavy: true, priority: false, fragile: true, to: 'Jeremy', trackingNumber: 'suz2367', lost: false, clicked: false}]

  let activePkgs = packages
  let lostPkg = null
  let failedFind = ''


function startSearch(){
  // window.alert('Warehouse Manage Package finder. Press OK to start')
  startPopup()
  let index = Math.floor(Math.random()*activePkgs.length)
  // console.log(index);
  activePkgs[index].lost = true
  // console.log('The lost Package', activePkgs[index]);
  lostPkg = activePkgs[index]
  drawPkg()
}

function filter(objProperty){
  let filteredPkgs = activePkgs.filter(package => package[objProperty] == true)
  activePkgs = filteredPkgs
  console.log(filteredPkgs)
  drawPkg()
}

function clearFilter(){
  activePkgs = packages
  drawPkg()
}


// why is found.click = true setting packages and not activepackages?
function findPackage(to){
  let found = activePkgs.find(p => p.to == to)
  console.log(found)
  if(found.to == lostPkg.to){
    // window.alert(`You found the lost package!`)
    successPopup()

  } else {
    found.clicked = true
    drawPkg()
    // window.alert(`This is not the package you are looking for`)
    errorPopup()
  }
}

function drawPkg(){
  let template = ''
  activePkgs.forEach(package => {
    template += `
    <div class="col-md-3 my-3" onclick="findPackage('${package.to}')">
    <div class="card text-center shadow rounded border border-warning border-3 lost-${package.clicked}">
      <div id="package-title" class="div"><i class = "mdi mdi-package-variant-closed fs-1"></i></div>
      <div>Package</div>
      <div class="border-top p-2">Heavy: ${package.heavy}${package.clicked}</div>
      <div class="p-2">Priority: ${package.priority}</div>
      <div class="p-2">Fragile: ${package.fragile}</div>
      <div class="p-2">Destination: ${package.to}</div>
      <div class="p-2">Tracking #: ${package.trackingNumber}</div>
    </div>
  </div>
    ` 
  })
  document.getElementById('pkg-display').innerHTML = template
}

function errorPopup(){Swal.fire({
  title: 'Error!',
  text: 'This is not the package you are looking for',
  icon: 'error',
  confirmButtonText: 'Ok'
})
}

function startPopup(){Swal.fire({
  title: 'Welcome to Warehouse Manager',
  text: 'Press Ok to start the game',
  confirmButtonText: 'Ok'
})
}

function successPopup(){Swal.fire({
  title: 'Success!',
  text: 'You found the lost package!! Press OK to reload',
  icon: 'success',
  confirmButtonText: 'Ok'
}).then((result) => {
  // Reload the Page
  location.reload();
})
}

startSearch()
