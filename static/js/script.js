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
  
  }
  
  // Create an instance of the AnimalApp class
  const animalApp = new AnimalApp();
  