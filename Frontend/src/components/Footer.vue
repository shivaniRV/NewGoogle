<template>
  <main>
    <div class="footer">
      <h3>All Rights are Reserved</h3>
      <p>Inutechsolution@gmail.com</p>
    </div>
  </main>
</template>
<style Scoped>
.footer {
  background-color: #eae0e0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer h3,
.footer p {
  color: #000;
  text-align: center;
}

@media (max-width: 768px) {
  .footer {
    height: auto;
    padding: 10px;
  }

  .footer h3,
  .footer p {
    margin-bottom: 5px;
  }
}
</style>
