const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'block';
    } else {
      sidebar.style.display = 'none';
    }
  };
  
  const openModal = () => {
    const modal = document.getElementsByClassName('modal')[0];
      modal.style.display = 'block';
  };

  const openAccountModal = () => {
    const modal = document.getElementsByClassName('modal')[1];
      modal.style.display = 'block';
  };
  const closeModal = () => {
    const modal = document.getElementsByClassName('modal')[0];
      modal.style.display = 'none';
  };

   