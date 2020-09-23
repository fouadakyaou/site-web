<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title> HASSAN ABERDAZ </title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
</head>
<body>
    <header>

<nav>
    <div class="logo"> <h1 class="animated infinite heartBeat delay-2s"> HASSAN ABERDAZ </h1></div>
    <div class="menu">
        <a href="https://www.youtube.com/">Home</a>
        <a href=""> Gallery</a>
        <a href="#">contact us</a>
        <a href="">about</a>
    </div>
</nav>
    <main>
        <section>
            <h3> WELCOME TO MORROCO </h3>
            <h1> DO COME VISIT MORROCO <span class="change_content"> </span></h1>
            <p>morroco is best contry for tourism </p>
            <a href="https://fr.wikipedia.org/wiki/Massa_(Maroc)" class="btnone"> learn more</a>
            <a href="#" class="btntwo"> sing up here </a>
        </section>
    </main>

    </header>
</body>
</html>
.header {
    height: 450px;
    width: 100%;
    position: relative;
    background: rgb(54, 53, 53);
    
}
.header__texture {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;left: 0;
    background: url(../css/img/js/photo-1520333789090-1afc82db536a.jpg) center no-repeat;
    background-size: cover;
    z-index: 1;
    opacity: 0.5;
}

.header__mask {
    position: absolute;
    bottom: 0;
    background: 0 0;
    height: 42px;
    width: 100%;
    z-index: 10;
}


.header__navbar {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header__navbar--logo_title {
    color: #fff;
    font-size: 28px;
}

.header__navbar--menu-link {
    margin-left: 40px;
    color: #fff;
    text-decoration: none;
}
.header__slogan {
    text-align: center;
    margin-top: 60px;
}

.h__slogan--title {
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    font-family: "Dancing Script";
    font-style: italic;
    letter-spacing: 1px;

}
.h__slogan--btn {
    padding: 10px 20px;
    color: #fff;
    text-decoration: none;
    background-color: rgb(236, 189, 101);
    border-radius: 10px;
}

body, html {
    margin: 0;
    padding: 0;
    font-family: 'Nunito';
}

.container {
    width: 90%;
    margin: auto;
    position: relative;
    z-index: 999;
}

