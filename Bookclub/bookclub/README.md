# book club demo

- [ ] set config in [application.properties](src/main/resources/application.properties)

```
# Where are jsp files? HERE!
spring.mvc.view.prefix=/WEB-INF/
# Data Persistence
spring.datasource.url=jdbc:mysql://localhost:3306/<<NAME OF DB>>
spring.datasource.username=root
spring.datasource.password=rootroot
spring.jpa.hibernate.ddl-auto=update
# For Update and Delete method hidden inputs
spring.mvc.hiddenmethod.filter.enabled=true
```

- [ ] update [pom.xml](pom.xml)

- [ ] add dependencies to [pom.xml](./pom.xml)

```xml
        <!-- DEPENDENCIES FOR DISPLAYING JSPS AND USING JSTL TAGS -->
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
        </dependency>
```
- [ ] Add dependencies for Bootstrap:

```xml
		<!-- DEPENDENCIES FOR BOOTSTRAP -->
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>webjars-locator</artifactId>
            <version>0.46</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>5.2.3</version>
        </dependency>
```
- [ ] Add dependencies for Validations:

```xml
        <!-- DEPENDENCY FOR USING VALIDATION ANNOTATIONS -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
```
- [ ] Add dependencies for bCrypt:
```
		<!-- from the platform -->
		<dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mindrot</groupId>
            <artifactId>jbcrypt</artifactId>
            <version>0.4</version>
        </dependency>
```


- [ ] add view [index.jsp](src/main/webapp/WEB-INF/index.jsp)

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- Formatting (dates) --> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"  %>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Tacos</title>
    <link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/main.css"> <!-- change to match your file/naming structure -->
    <script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/app.js"></script><!-- change to match your file/naming structure -->
</head>
<body>
    ${userId}
   <div class="container">
<h1  class="align-content-center">Login and Registration</h1>
    <div class="row">
        <div class="col">
            <h2>Register</h2>
            <form:form action="/register" method="post" modelAttribute="newUser">
                <div>
                    <div class="form-group">
                    <form:label path="userName">userName</form:label>
                    <form:input  class="form-control" path="userName"/>
                    <form:errors path="userName"/>
                    </div>
                    <div class="form-group">
                    <form:label path="email">email</form:label>
                    <form:input  class="form-control" path="email"/>
                    <form:errors path="email"/>
                    </div>
                    <div>
                    <form:label path="password">password</form:label>
                    <form:input  class="form-control" path="password"/>
                    <form:errors path="password"/>
                    </div>
                    <div>
                    <form:label path="confirm">confirm password</form:label>
                    <form:input  class="form-control" path="confirm"/>
                    <form:errors path="confirm"/>
                    </div>
                </div>
                <input type="submit" value="register">
            </form:form>
        </div>
        <div class="col">
            <h2>Login</h2>
            <div class="form-group">
                <form:form action="/login" method="post" modelAttribute="newLogin">
                    <div class="form-group">
                        <form:label path="email">email</form:label>
                        <form:input  class="form-control" path="email"/>
                        <form:errors path="email"/>
                    </div>
                    <div>
                        <form:label path="password">password</form:label>
                        <form:input  class="form-control" path="password"/>
                        <form:errors path="password"/>
                    </div>
                <input type="submit" value="login">
                </form:form>
            </div>
        </div>

    </div>
</div>
</body>
</html>
```
## Views
- [ ] add a view for show all [views.jsp](./src/main/webapp/WEB-INF/views.jsp)

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- Formatting (dates) --> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"  %>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Book Club</title>
    <link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/main.css"> <!-- change to match your file/naming structure -->
    <script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/app.js"></script><!-- change to match your file/naming structure -->
</head>
<body>
<h1>Book Club</h1>
</body>
</html>
```

- [ ] add a view for show one [show.jsp](./src/main/webapp/WEB-INF/show.jsp)

- [ ] add a view for create [new.jsp](./src/main/webapp/WEB-INF/new.jsp)

- [ ] add a view for update [edit.jsp](./src/main/webapp/WEB-INF/edit.jsp)


## Controllers
- [ ] Make our [MainController](./src/main/java/miki/bookclub/controllers/MainController.java). :warning:<span style="color:red">WARNING!!</span> :warning: This link won't work in your file!!!

```java
@Controller
public class MainController {

    //! READ ALL
    @GetMapping("/")
    public String index(){
        return "index.jsp";
    }
}
    
```
- [ ] Make our [UserController](./src/main/java/miki/bookclub/controllers/UserController.java). :warning:<span style="color:red">WARNING!!</span> :warning: This link won't work in your file!!!

```java
@Controller
public class UserController {

}
    
```
- [ ] Make our [BookController](./src/main/java/miki/bookclub/controllers/BookController.java). :warning:<span style="color:red">WARNING!!</span> :warning: This link won't work in your file!!!

```java
@Controller
@RequestMapping("/books")
public class BookController {

    //! READ ALL
    @GetMapping("/")
    public String index(){
        return "views.jsp";
    }
}
    
```

## User Models (2 layers)

### user persistance layer

- [ ] Created [User.java](src/main/java/miki/bookclub/models/User.java)

- [ ] Create [UserRepository.java](src/main/java/miki/bookclub/repositories/UserRepository.java) i.e. the ORM - object relational mapper

### user service layer

- [ ] Create [UserService.java](src/main/java/miki/bookclub/services/UserService.java) 

## Book Models (2 layers)

### book persistance layer

- [ ] Created [Book.java](src/main/java/miki/bookclub/models/Book.java)

- [ ] Create [BookRepository.java](src/main/java/miki/bookclub/repositories/BookRepository.java) i.e. the ORM - object relational mapper

### book service layer

- [ ] Create [BookService.java](src/main/java/miki/bookclub/services/BookService.java) 