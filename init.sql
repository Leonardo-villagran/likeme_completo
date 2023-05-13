CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "titulo" VARCHAR(25) NULL DEFAULT NULL,
    "img" VARCHAR(1000) NULL DEFAULT NULL,
    "descripcion" VARCHAR(255) NULL DEFAULT NULL,
    "likes" INTEGER NULL DEFAULT NULL
);

INSERT INTO "posts" ("titulo", "img", "descripcion", "likes") VALUES
	('Jack Sparrow', 'https://www.latercera.com/resizer/uO0kNlT20KdtIL0pJPXXwyO-sxs=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/NI6XTALQUFFVXGZ6TXKJBB5B3Q.jpg', 'Hace lo que quiera cuando quiera.', 10),
	('El Padrino', 'https://i.blogs.es/92e26a/el-padrino/1366_2000.jpg', 'Te haré una oferta que no podrás rechazar.', 7),
	('IRONMAN', 'https://lumiere-a.akamaihd.net/v1/images/iron_man_marvel_d9ce0209.jpeg', 'El poder del licor se apodera de los superhéroes', 20),
	('Star Wars', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png', 'En una galaxia muy  muy, pero muy lejana...', 5),
	('Volver al futuro', 'https://i.blogs.es/9d138a/regreso-al-futuro-ii-cartel/1366_2000.jpg', 'Algo pasó que se desordenó todo en el pasado', 6),
	('Ghosted', 'https://ipadizate.com/hero/2023/04/ghosted-serie-apple.jpg', 'El Capitán América pierde los huevos', 5),
	('Avatar', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/06/avatar-2366079.jpg', 'En un planeta especial donde se ve todo azul', 4);