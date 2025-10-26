
var carsToCompare = [];


class Car {
  constructor(modelo, preco, alturacacamba, alturaveiculo, alturasolo, capacidadecarga, motor, potencia, volumecacamba, roda, imagem) {
    this.modelo = modelo;
    this.preco = preco;
    this.alturacacamba = alturacacamba;
    this.alturaveiculo = alturaveiculo;
    this.alturasolo = alturasolo;
    this.capacidadecarga = capacidadecarga;
    this.motor = motor;
    this.potencia = potencia;
    this.volumecacamba = volumecacamba;
    this.roda = roda;
    this.imagem = imagem;
  }
}


function GetCarArrPosition(car) {
  for (let i = 0; i < carsToCompare.length; i++) {
    if (carsToCompare[i].modelo === car.modelo) return i;
  }
  return -1;
}


function SetCarToCompare(checkbox, car) {
  const pos = GetCarArrPosition(car);

  if (checkbox.checked) {
    if (carsToCompare.length >= 2) {
      alert("Você só pode comparar dois veículos por vez.");
      checkbox.checked = false;
      return;
    }
    if (pos === -1) carsToCompare.push(car);
  } else {
    if (pos !== -1) carsToCompare.splice(pos, 1);
  }
}


function ShowCompare() {
  if (carsToCompare.length < 2) {
    alert("Selecione dois veículos para comparar.");
    return;
  }

  UpdateCompareTable();
  document.getElementById("compare").style.display = "block";
}


function HideCompare() {
  document.getElementById("compare").style.display = "none";
  carsToCompare = [];
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
}


function UpdateCompareTable() {
  for (let i = 0; i < 2; i++) {
    const car = carsToCompare[i];
    if (!car) continue;

    document.getElementById(`compare_image_${i}`).innerHTML = `<img src="${car.imagem}" width="200">`;
    document.getElementById(`compare_modelo_${i}`).innerText = car.modelo;
    document.getElementById(`compare_alturacacamba_${i}`).innerText = car.alturacacamba + " mm";
    document.getElementById(`compare_alturaveiculo_${i}`).innerText = car.alturaveiculo + " mm";
    document.getElementById(`compare_alturasolo_${i}`).innerText = car.alturasolo + " mm";
    document.getElementById(`compare_capacidadecarga_${i}`).innerText = car.capacidadecarga + " Kg";
    document.getElementById(`compare_motor_${i}`).innerText = car.motor + " L";
    document.getElementById(`compare_potencia_${i}`).innerText = car.potencia + " cv";
    document.getElementById(`compare_volumecacamba_${i}`).innerText = car.volumecacamba + " L";
    document.getElementById(`compare_roda_${i}`).innerText = car.roda;
    document.getElementById(`compare_preco_${i}`).innerText = "R$ " + car.preco.toLocaleString("pt-BR");
  }
}
