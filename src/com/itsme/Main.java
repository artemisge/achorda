package com.itsme;

//import javafx.application.Application;

import java.io.File;
import java.io.IOException;

import com.itsme.Scale.Note;

public class Main {

    public static void main(String[] args) {
//        try {
//            File myObj = new File("Test.txt");
//            if (myObj.createNewFile()) {
//                System.out.println("File created: " + myObj.getName());
//            } else {
//                System.out.println("File already exists.");
//            }
//        } catch (IOException e) {
//            System.out.println("An error occurred.");
//            e.printStackTrace();
//        }

        // -------------SONG-------------
        //Song song = new Song("Test");
        //song.printChords(); //works

        // -------------GUI-------------
        //GUI myGui = new GUI();
        //in order to launch it from main, and not to have main inside GUI
        //Application.launch(GUI.class, args);

        // ----------------SCALE-------------
        Scale test = new Scale();
        Note n = Note.g;
        test.createScale("Ionian", n);
        test.printChords();
    }
}
