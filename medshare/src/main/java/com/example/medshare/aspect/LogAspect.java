package com.example.medshare.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    @Before("execution(* com.example.medshare.service.*.*(..))")
    public void beforeServiceMethod() {
        // Log before service method execution
    }
}
