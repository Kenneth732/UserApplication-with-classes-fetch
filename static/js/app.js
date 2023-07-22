class AnimalApp {
  constructor() {
    this.animalList = document.querySelector('#animal-list');
    this._nameInput = document.querySelector('#nameInput');
    this._imageInput = document.querySelector('#imageInput');
    this._descriptionInput = document.querySelector('#descriptionInput');

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.handleDonateRequest = this.handleDonateRequest.bind(this);

    document.querySelector('#animal-form').addEventListener('submit', this.handleFormSubmit);
    this.handleRenderFetch();
  }

  // Getter and setter method for nameInput
  get nameInput() {
    return this._nameInput.value;
  }

  set nameInput(value) {
    // Add validation here (e.g., check if value is not empty)
    if (value.trim() !== '') {
      this._nameInput.value = value;
    } else {
      console.error('Name cannot be empty.');
    }
  }

  // Getter and setter method for imageInput
  get imageInput() {
    return this._imageInput.value;
  }

  set imageInput(value) {
    // Add validation here (e.g., check if value is a valid image URL)
    if (value.startsWith('http://') || value.startsWith('https://')) {
      this._imageInput.value = value;
    } else {
      console.error('Invalid image URL.');
    }
  }

  // Getter and setter method for descriptionInput
  get descriptionInput() {
    return this._descriptionInput.value;
  }

  set descriptionInput(value) {
    // Add validation here (e.g., check if value is not empty)
    if (value.trim() !== '') {
      this._descriptionInput.value = value;
    } else {
      console.error('Description cannot be empty.');
    }
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

  handlePostRequest(animal) {
    fetch('http://localhost:3000/animalsData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    })
      .then(() => {
        this.nameInput = ''; // Using the setter to reset the value
        this.imageInput = ''; // Using the setter to reset the value
        this.descriptionInput = ''; // Using the setter to reset the value
        this.handleRenderFetch();
      })
      .catch(error => console.error(error));
  }

  handleDeleteRequest(animalId) {
    fetch(`http://localhost:3000/animalsData/${animalId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.handleRenderFetch();
      })
      .catch(error => console.error(error));
  }

  handleEditRequest(animalId, updatedAnimal) {
    fetch(`http://localhost:3000/animalsData/${animalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAnimal)
    })
      .then(() => {
        this.handleRenderFetch();
      })
      .catch(error => console.error(error));
  }

  handleDonateRequest(animalId) {
    fetch(`http://localhost:3000/animalsData/${animalId}`)
      .then((res) => res.json())
      .then((animal) => {
        const updatedDonations = animal.donations + 10;

        return fetch(`http://localhost:3000/animalsData/${animalId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ donations: updatedDonations }),
        });
      })
      .then(() => {
        this.handleRenderFetch();
      })
      .catch((error) => console.error(error));
  }
}

// Create an instance of the AnimalApp class
const animalApp = new AnimalApp();
