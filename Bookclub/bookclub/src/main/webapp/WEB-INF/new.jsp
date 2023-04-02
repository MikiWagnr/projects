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
    <title>Books</title>
    <link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/src/main/resources/static/css/style.css"> <!-- change to match your file/naming structure -->
    <script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/app.js"></script><!-- change to match your file/naming structure -->

</head>
<body>
    <div class="container">
        <h2>Add a Book To Your Shelf!</h2>
        <a class="btn btn-outline-dark" href="/books">home</a>

        <form:form action="/books/create/new" method="post" modelAttribute="book">
            <form:input type="hidden" path="user" value="${userId}"></form:input>
            <div class="form-control">
                <form:label path="title">Title: </form:label>
                <form:errors path="title" />
                <form:input path="title"></form:input>
            </div>
            <div class="form-control">
                <form:label path="author">Author: </form:label>
                <form:errors path="author" />
                <form:input path="author"></form:input>
            </div>
        <div class="form-control">
            <form:label path="thoughts">My Thoughts: </form:label>
            <form:errors path="thoughts" />
            <form:input path="thoughts"></form:input>
        </div>
        <button class="btn-outline-dark" type="submit">submit</button>
        </form:form>

    </div>

</body>
</html>