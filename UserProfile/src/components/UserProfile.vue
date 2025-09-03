<script setup>
    import { reactive, computed, watch, watchEffect, onMounted, onUpdated, onUnmounted } from 'vue';

    const userData = reactive({
        firstName: '',
        lastName: '',
        age: null
    });

    const errors = reactive({
        age: '',
    });

    onMounted(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        if (data) {
            userData.firstName = data.firstName;
            userData.lastName = data.lastName;
            userData.age = data.age;
        }
    });

    onUpdated(() => {
        console.log("Данные обновлены");
    });

    onUnmounted(() => {
        stop_age();
        stop_saveData();
    });

    const fullName = computed(() => {
        return userData.firstName + " " + userData.lastName;
    });

    const isNotEmpty = computed(() => { return userData.firstName !== "" || userData.lastName !== "" });

    const stop_age = watch(() => userData.age, (newVal, oldVal) => {
        if (newVal < 0 || newVal > 120) {
            errors.age = "Вы ввели некорректный возраст!";
        } else {
            errors.age = "";
        }
    });

    const stop_saveData = watchEffect(() => {
        if (userData.firstName || userData.lastName || userData.age !== null) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    });

    function clearForm() {
        for (let key of Object.keys(userData)) {
            if(typeof userData[key] === 'string') {
                userData[key] = "";
            } else if (typeof userData[key] === 'number') {
                userData[key] = null;
            }
        }
    }
</script>
<template>
    <h1>Личный кабинет</h1>
    <div v-if="isNotEmpty">
        Здравствуйте, {{fullName}}!
    </div>
    <div class="info">
        <h3>Ваши данные:</h3>
        <div class="info__firstName">
            <label for="firstName">Имя:</label>
            <input type="text" id="firstName" name="info__firstName_field" v-model.lazy.trim="userData.firstName">
        </div>

        <div class="info__lastName">
            <label for="lastName">Фамилия:</label>
            <input type="text" id="lastName" name="info__lastName_field" v-model.lazy.trim="userData.lastName">
        </div>

        <div class="info__age">
            <label for="age">Возраст:</label>
            <input type="number" id="age" name="info__age_field" v-model.lazy.number="userData.age" :class="{ 'error-field': errors.age }">
            <div v-if="errors.age" class="error">{{ errors.age }}</div>
        </div>
        <button @click="clearForm">Очистить</button>
    </div>
</template>
<style>
.info {
    max-width: 400px;
    margin: 20px 0px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.info h3 {
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: #333;
}

.info__firstName,
.info__lastName,
.info__age {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
}

input[type="text"],
input[type="number"] {
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

input[type="text"]:focus,
input[type="number"]:focus {
    border-color: #007BFF;
    outline: none;
}

.error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
}

.error-field {
    
    border-color: red !important;
}

button {
    padding: 8px 15px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: #0056b3;
}

</style>