# tp_arq_web_23
Trabajo Practico - Arquitectura web - Universidad de Palermo 2023

**Gestión vetenrinaria**  

La API */pets/* gestión de una mascota en la veterinaria.  
La API */vets/* gestión de los veterinarios de la veterinaria.  
La API */petscare/* gestion de atención de mascotas por veterinario.  
La API */users/* gestión de los dueños de las mascotas.  

**Endpoints /pets/**  

CRUD
1. POST */pets/* ---> Crear una mascota   
2. GET */pets/* ----> Obtener todas las mascotas  
3. GET */pets/{id}* ----> Obtener una mascota  
4. PUT */pets/{id}* ----> Actualizar datos de una mascota  
5. DELETE */pets/{id}* ----> Eliminar una mascota  

**Endpoints /petscare/**  

Endpoint para complejizar
GET */petscare/history: Muestra todas consultas que se hicieron o se puede filtrar.  
Filtros:  
    1.pet_id (optional): Filtrar por Id de mascota.  
    2.owner_id (optional): Filtrar por id de dueño.  
    3.vet_id (optional): Filtrar por id de veterinario.   
    4.start_date (optional): Filtrar por rango de fecha. Desde Fecha.  
    5.end_date (optional): Filtrar por rango de fecha. Hasta fecha.  

