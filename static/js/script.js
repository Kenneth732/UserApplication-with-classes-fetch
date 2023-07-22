class AnimalApp {
    constructor() {
      this.animalList = document.querySelector('#animal-list');
      this.nameInput = document.querySelector('#nameInput');
      this.imageInput = document.querySelector('#imageInput');
      this.descriptionInput = document.querySelector('#descriptionInput');

  
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
      this.handleEditRequest = this.handleEditRequest.bind(this);
      this.handleDonateRequest = this.handleDonateRequest.bind(this);
  
      document.querySelector('#animal-form').addEventListener('submit', this.handleFormSubmit);
      this.handleRenderFetch();
    }
  
    handleFormSubmit(e) {
      e.preventDefault();
  
      const newAnimal = {
        nameInput: this.nameInput.value,
        imageInput: this.imageInput.value,
        descriptionInput: this.descriptionInput.value,
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
  
        const deleteButton = animalItem.querySelector('.deleteBtn');
        const editButton = animalItem.querySelector('.editBtn');
        const donateBtn = animalItem.querySelector('.donateBtn');
  
        deleteButton.addEventListener('click', () => {
          const animalId = deleteButton.dataset.id;
          this.handleDeleteRequest(animalId);
        });
  
        editButton.addEventListener('click', () => {
          const animalId = editButton.dataset.id;
          const updatedAnimal = {
            nameInput: prompt('Enter the new name:', animal.nameInput),
            imageInput: prompt('Enter the new image URL:', animal.imageInput),
            descriptionInput: prompt('Enter the new description:', animal.descriptionInput),
            donations: animal.donations
          };
          this.handleEditRequest(animalId, updatedAnimal);
        });
  
        donateBtn.addEventListener('click', () => {
          const animalId = donateBtn.dataset.id;
          this.handleDonateRequest(animalId);
        });
  
        this.animalList.appendChild(animalItem);
      });
    }
  
    handleRenderFetch() {
      fetch('http://localhost:3000/animalsData')
        .then(res => res.json())
        .then(data => this.handleDisplay(data))
        .catch(error => console.error(error));
    }
  
  }
  
  // Create an instance of the AnimalApp class
  const animalApp = new AnimalApp();
  