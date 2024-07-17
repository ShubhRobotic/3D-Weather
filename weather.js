let location = "Medford,Ma";

function getData(){
  fetch('https://api.weatherapi.com/v1/forecast.json?key=1641fbee64d5485cb64195705241007&q='+ location +'&days=7&aqi=no&alerts=no')
    .then(response => response.json())
    .then(data => {
      // Process the fetched data
      console.log(data);
      send(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function getLocation(){
    setPosition(-0.6,0.43,0);
    pitchX(-90);
    setScale(2);
    text(location);
    pitchX(0);
}

function send(data) {
// Process blue display  
  setScale(0.04, 0.04, 0.04);
  setPosition(0, 0, 0);
  yawY(0);
  gltfModel('https://github.com/ShubhRobotic/3D-Weather/blob/main/display.glb');

  // Process each day and check which 3d object to show based on switch case
  const days = data.forecast.forecastday;
  const positions = [
    { x: -0.7, y: 1, z: -5.5 },
    { x: 3.7, y: 1, z: -3.5 },
    { x: 5, y: 1, z: 1 },
    { x: 2.2, y: 1, z: 4.7 },
    { x: -1.9, y: 1, z: 5 },
    { x: -5.5, y: 1, z: 1.7 },
    { x: -4.5, y: 1, z: -3.3 }
  ];
  const yaws = [-80, 60, -10, -60, 60, 25, -40];

  days.forEach((day, index) => {
      console.log(day.day.maxtemp_c + " " + index);
    setPosition(positions[index].x, positions[index].y, positions[index].z);
    yawY(yaws[index]);

    switch (day.day.condition.text) {
      case "Partly Cloudy":
      case "Overcast":
        cloudy();
        break;
      case "Sunny":
        sunny();
        break;
      case "Patchy rain nearby":
      case "Light rain":
      case "Heavy rain":
      case "Light rain shower":
        rainy();
        break;
      case "Clear":
        sunny();
        break;
      case "Thundery outbreaks in nearby":
          break;
      default:
        sunny();
    }
  });

// position for temp text
const temp = [
    { yaw: 20, position:[-0.5,3,-4.5] },
    { yaw: -35, position: [3.1, 3, -3.5] },
    { yaw: -100, position: [4.8, 3, 0.5] },
    { yaw: 210, position: [2.4, 3, 4.2] },
    { yaw: -215, position: [-1.7, 3, 4.3] },
    { yaw: 120, position: [-4.7, 3, 1.5] },
    { yaw: 55, position: [-3.4, 3, -2.5] }
];

// Loop through the array and shows temp for each day
temp.forEach((temps, index) => {
    yawY(temps.yaw);
    setPosition(...temps.position);
    setScale(0, 0, 0);
    text(data.forecast.forecastday[index].day.maxtemp_c + ' ');
});

const title = [
    { yaw: 20, position:[-0.3,3.5,-4.5], day: "M" },
    { yaw: -35, position: [3.3, 3.5, -3.5], day: "T"  },
    { yaw: -100, position: [5, 3.5, 0.5], day: "W"  },
    { yaw: 210, position: [2.3, 3.5, 4.2], day: "T"  },
    { yaw: -215, position: [-1.9, 3.5, 4.3], day: "F"  },
    { yaw: 120, position: [-4.9, 3.5, 1.5], day: "S"  },
    { yaw: 55, position: [-3.4, 3.5, -2.6], day: "S"  }
];
title.forEach((days,index) => {
    yawY(days.yaw);
    setPosition(...days.position);
    setScale(0,0,0);
    text(...days.day +" ");

    
})
}

getData();
getLocation();

function sunny(){
    gltfModel('https://github.com/ShubhRobotic/3D-Weather/blob/main/sunny.glb');
}
function rainy(){
    gltfModel('https://github.com/ShubhRobotic/3D-Weather/blob/main/raining.glb')
}
function cloudy(){
    gltfModel('https://github.com/ShubhRobotic/3D-Weather/blob/main/cloud.glb');
}
function cloudy(){
    gltfModel('https://github.com/ShubhRobotic/3D-Weather/blob/main/ThunderStrom.glb');
}
