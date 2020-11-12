package com.itsme;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

import com.itsme.Chord.chordType;


public class Scale {
    //mode name and pattern to implement. eg <"Ionian", [2, 2, 1, 2, 2, 2, 1]>
    HashMap<String, Integer[]> modes;

    // scale made from mode and key
    ArrayList<Note> scale;

    // chords beloning to the scale
    ArrayList<Chord> chords;

    // to be iterated circularly
    enum Note {
        a(0), as(1), b(2), c(3), cs(4), d(5), ds(6), e(7), f(8), fs(9), g(10), gs(11);
        private int value;
        private Note(int value) { this.value = value; }

        // given an int value, will check which note has the corresponding value and return it.
        public static Note noteOfValue(int val) {
            for (Note n : values()) {
                if (n.value == val) { // check if works. original: if (e.label.equals(label)) {
                    return n;
                }
            }
            return null;
        }
    }

    public Scale() {
        modes = new HashMap<>(); // no order in hashMap's elements
        loadModes();
    }

    void loadModes() {
        try{
            InputStream is = new FileInputStream("Modes.txt");
            BufferedReader buf = new BufferedReader(new InputStreamReader(is));
            Scanner scanner;
            String tmpName;
            ArrayList<Integer> tmpArray;
            String line;
            while ((line = buf.readLine()) != null) {
                scanner = new Scanner(line);
                // FORMAT
                // Ionian 1 2 2 ....
                // Aeolian 2 2 1 2 ....
                tmpName = scanner.next();
                tmpArray = new ArrayList<>();
                while (scanner.hasNextInt()) {
                    tmpArray.add(scanner.nextInt());
                }
                modes.put(tmpName, tmpArray.toArray(new Integer[0]));
            }
            buf.close();
        }
        catch (Exception e){
            System.out.println("\nfile couldn't open oops");
        }

        //to test in main
        // will print all modes
        for (String name : modes.keySet()) {
            System.out.print("-" + name + ": ");
            for (Integer i : modes.get(name)) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }

    // will create an arrayList of Notes like: a, b, c, d....
    void createScale(String modeName, Note tonic){
        scale = new ArrayList<>();
        // adding first note of scale
        scale.add(tonic);
        int currentNoteValue = tonic.value; //eg if tonic is a then value is zero. Or if tonic is g then value is ten.
        int step; //step counter whole/half tone usually 1-2 TEMPORARY

        for (int i = 0; i < modes.get(modeName).length; i++) { // for each whole/half tone step that is to be done
            step = modes.get(modeName)[i];
            currentNoteValue = (currentNoteValue + step) % 12; //mod 12, because 12 notes exist. Implements the circular approach.
            scale.add(Note.noteOfValue(currentNoteValue));
        }

        chords = new ArrayList<>();
        createChords(modeName, tonic);
    }

    //
    void createChords(String modeName, Note tonic) {
        int first, second; // example: C E G, first is the distance between C and E and second, the distance between E and G
        Integer[] steps = new Integer[modes.get(modeName).length];
        System.arraycopy(modes.get(modeName), 0, steps, 0, modes.get(modeName).length);
        int length = steps.length;
        Chord chord;
        chordType chordtype ;
        // for every chord in scale
        for (int i = 0; i < length; i++) {
            first = steps[i % length] + steps[(i+1) % length];
            second = steps[(i+2) % length] + steps[(i+3) % length];
            if (first == 4) {
                if (second == 3)
                    chordtype = chordType.MAJOR;
                else
                    chordtype = chordType.AUGMENTED;
            } else {
                if (second == 3)
                    chordtype = chordType.DIMINISHED;
                else
                    chordtype = chordType.MINOR;
            }
            chord = new Chord(i+1, chordtype);
            chords.add(chord);
        }
    }

    void printChords() {
        //on current scale that has been created
        Iterator<Chord> c = chords.iterator();
        Iterator<Note> s = scale.iterator();
        while (c.hasNext() && s.hasNext()) {
            System.out.println(s.next() + " " + c.next().attribute);
        }
    }
}
