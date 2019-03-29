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
  const openModal1 = () => {
    const modal = document.getElementsByClassName('modal1')[0];
      modal.style.display = 'block';
  };
  const openModal2 = () => {
    const modal = document.getElementsByClassName('modal2')[0];
      modal.style.display = 'block';
  };
  const openModal3 = () => {
    const modal = document.getElementsByClassName('modal3')[0];
      modal.style.display = 'block';
  };
  const openModal4 = () => {
    const modal = document.getElementsByClassName('modal4')[0];
      modal.style.display = 'block';
  };
  const openModal5 = () => {
    const modal = document.getElementsByClassName('modal5')[0];
      modal.style.display = 'block';
  };

  const closeModal = () => {
    const modal = document.getElementsByClassName('modal')[0];
    const modal1 = document.getElementsByClassName('modal1')[0];
    const modal2 = document.getElementsByClassName('modal2')[0];
    const modal3 = document.getElementsByClassName('modal3')[0];
    const modal4 = document.getElementsByClassName('modal4')[0];
    const modal5 = document.getElementsByClassName('modal5')[0];

      modal.style.display = 'none';
      modal1.style.display = 'none';
      modal2.style.display = 'none';
      modal3.style.display = 'none';
      modal4.style.display = 'none';
      modal5.style.display = 'none';
      
  };
  const closeModalStaff = () => {
    const modal = document.getElementsByClassName('modal')[0];
    const modal2 = document.getElementsByClassName('modal2')[0];
    const modal3 = document.getElementsByClassName('modal3')[0];
    const modal4 = document.getElementsByClassName('modal4')[0];
    const modal5 = document.getElementsByClassName('modal5')[0];
      modal.style.display = 'none';
      modal2.style.display = 'none';
      modal3.style.display = 'none';
      modal4.style.display = 'none';
      modal5.style.display = 'none';
  };
   