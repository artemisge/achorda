package com.itsme;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

import com.itsme.Chord.chordType;

public class Song {
    public String name;
    public String lyrics;
    public String singer;
    public List<Chord> baseChords = new ArrayList<>();
    public List<Chord> chords = new ArrayList<>();
    public int originalkey; //TODO change it to Note type
    public int currentkey;
    public static final String[] notesAr = new String[] { "a", "as", "b", "c", "cs", "d", "ds", "e", "f", "fs", "g", "gs" };
    public static final ArrayList<String> note = new ArrayList<>(Arrays.asList(notesAr));


    public Song(String nameOfSong) { //user will pick from available list in gui and gui will send the name
        //load from file
        loadSong(nameOfSong);
    }

    public void loadSong(String nameOfSong) {
        name = nameOfSong;
        //for chords, lyrics, artist, original key
        try{
            String filename = String.format("%s.txt", nameOfSong) ;
            InputStream is = new FileInputStream(filename);
            BufferedReader buf = new BufferedReader(new InputStreamReader(is));

            //ARTIST
            String line = buf.readLine();
            singer = line;

            //ORIGINAL KEY
            line = buf.readLine();
            originalkey = note.indexOf(line);
            //ara to original key exei mesa to index tou arraylist
            // note opou einai i sugkekrimeni nota

            //CHORDS
            line = buf.readLine();
            Scanner scanner = new Scanner(line).useDelimiter(" ");
            int i = 0;
            while (scanner.hasNext()) {
                int sn = scanner.nextInt();
                chordType chordtype = chordType.valueOf(scanner.next());
                Chord c = new Chord(sn, chordtype);
                baseChords.add(c);
            }

            //LYRICS
            line = buf.readLine();
            StringBuilder sb = new StringBuilder();

            while(line != null){
                sb.append(line).append("\n");
                line = buf.readLine();
            }

            lyrics = sb.toString();

            //CURRENT KEY
            currentkey = originalkey;
        }
        catch (Exception e){
            System.out.println("\nfile couldn't open oops");
        }
    }

    public String printSong() {
        String[] array = baseChords.toArray(new String[0]);
        String string = String.format(lyrics, array);
        System.out.println(string);
        return string;
    }

    public void transpose(String key) {
        //updateChords();
        //currentKey = key;

    }

    public String[] getKeyChords() {
        //TODO bash tou current key
        //TODO pros to paron tha epistrefei enan pinaka me akornta mono
        // me notes, xoris attribute, analoga me to original key
        ArrayList<String> chords = new ArrayList<>();

        String[] bathmides = new String[7]; //7 gia 7 bathmides
        //bathmides[0]
        for (Chord c : this.baseChords) {
            switch(c.toString()) {
                case "MAJOR":

                    break;
                case "MINOR":

                    break;
                case "MAJORSEVEN":

                    break;
                case "MINORSEVEN":

                    break;
                case "NINE":

                    break;
                case "DIMINISHED":

                    break;
            }

        }
        return null;
    }

    public void printChords() {
        System.out.println("Now printing chords\n");
        for (Chord c : chords) {
            c.print();
        }
    }

    //gia song edit argotera.. pros to paron edit manually.
    //TODO mode oste na emfanizei anti gia akornta, tis bathmides px I VI V v klp
    //TODO practise mode, oste se ena tragoudi na bgazei ena arxiko
    // key kai na prepei na to paikseis exontas mono tis arxikes bathmides
}
