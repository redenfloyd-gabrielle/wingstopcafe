<template>
  <div class="container d-flex flex-column">
    <div class="row vh-100">
      <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
        <div class="d-table-cell align-middle">
          <div class="text-center mt-4">
            <div class="text-center">
              <img
                src="../assets/img/icons/logo-black.png"
                alt="wingstopcafe"
                class="img-fluid rounded-circle"
                width="200"
                height="200"
              />
            </div>
            <h1 class="h2">WINGS·TOP CAFE</h1>

            <p class="lead">Sign in to your account</p>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="m-sm-1">
                <!-- <div class="text-center">
                  <img
                    src="../assets/img/icons/Clean Logo-black.png"
                    alt="wingstopcafe"
                    class="img-fluid rounded-circle"
                    width="132"
                    height="132"
                  />
                </div> -->
                <form>
                  <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input
                      class="form-control form-control-lg"
                      type="test"
                      name="test"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div class="text-center mt-3">
                    <a href="#" class="btn btn-lg btn-primary">Sign in</a>
                    <!-- <button type="submit" class="btn btn-lg btn-primary">Sign in</button> -->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
