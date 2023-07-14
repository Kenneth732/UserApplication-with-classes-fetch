class AnimalApp {
    constructor() {
      this.animalList = document.querySelector('#animal-list');
      this._nameInput = document.querySelector('#nameInput');
      this._imageInput = document.querySelector('#imageInput');
      this._descriptionInput = document.querySelector('#descriptionInput');
      this.animals = [];
  
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
      this.handleEditRequest = this.handleEditRequest.bind(this);
      this.handleDonateRequest = this.handleDonateRequest.bind(this);
  
      document.querySelector('#animal-form').addEventListener('submit', this.handleFormSubmit);
      this.handleRenderFetch();
    }
  
    get nameInput() {
      return this._nameInput.value;
    }
  
    set nameInput(value) {
      this._nameInput.value = value;
    }
  
    get imageInput() {
      return this._imageInput.value;
    }
  
    set imageInput(value) {
      this._imageInput.value = value;
    }
  
    get descriptionInput() {
      return this._descriptionInput.value;
    }
  
    set descriptionInput(value) {
      this._descriptionInput.value = value;
    }
  
    handleFormSubmit(e) {
      e.preventDefault();
  
      const newAnimal = {
        nameInput: this.nameInput,
        imageInput: this.imageInput,
        descriptionInput: this.descriptionInput,
        donations: 0
      };
  
      this.handlePostRequest(newAnimal);
    }
  
    handleDisplay(data) {
      this.animalList.innerHTML = '';
  
      data.forEach(animal => {
        const animalItem = document.createElement('li');
        animalItem.classList.add('card');
        animalItem.innerHTML = `
          <h3>${animal.nameInput}</h3>
          <img src="${animal.imageInput}" alt="${animal.name}">
          <p>${animal.descriptionInput}</p>
          <p>Donations: ${animal.donations}</p>
          <button class="editBtn" data-id="${animal.id}">Edit</button>
          <button class="donateBtn" data-id="${animal.id}">Donation</button>
          <button class="deleteBtn" data-id="${animal.id}">Delete</button>
        `;
  
        this.animalList.appendChild(animalItem);
      });
    }
  
  }
  
  // Create an instance of the AnimalApp class
  const animalApp = new AnimalApp();
  